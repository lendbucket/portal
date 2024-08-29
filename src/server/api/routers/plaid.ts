import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { ID_VER_TEMPLATE, PLAID_COUNTRY_CODES, PLAID_IDV_PRODUCTS, PLAID_TRANSFER_PRODUCTS, plaidClient, WEBHOOK_URL_FOR_TRANSFOR } from "@/utils/plaid";
import { ACHClass, TransferRecurringCreateRequest, TransferRecurringNetwork, TransferScheduleIntervalUnit, TransferType } from "plaid";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

const linkTokenSchema = {
  userId: z.string(),
  email: z.string()
}

const updateVerifySchema = {
  sessionId: z.string()
}

export const plaidRouter = createTRPCRouter({
  generateLinkTokenForTransfer: publicProcedure
    .input(z.object({
      userId: z.string(),
      legalName: z.string(),
      accountId: z.any().optional(),
      billId: z.string(),
      amount: z.string(),
      accessToken: z.string().optional(),
      description: z.string()
    }))
    .mutation(async ({ input }) => {
      const { userId, legalName, accountId, billId, amount, accessToken, description } = input
      const userObject = {
        client_user_id: userId,
        legal_name: legalName,
      };
      const amountAsString = Number.parseFloat(amount).toFixed(2);
      // Let's just make sure we normalize the accountID.
      const accountIdOrNull =
        accountId != null && accountId !== "new" && accountId !== ""
          ? accountId
          : null;

      try {
        // Call transferIntentCreate to invoke the transfer UI
        const transferIntentId = await getTransferIntentId(
          legalName,
          amountAsString,
          billId,
          accountIdOrNull,
          description
        );
        const linkTokenCreateObject: any = {
          user: userObject,
          products: PLAID_TRANSFER_PRODUCTS,
          transfer: {
            intent_id: transferIntentId,
          },
          client_name: process.env.APP_NAME,
          language: "en",
          country_codes: PLAID_COUNTRY_CODES,
          webhook: WEBHOOK_URL_FOR_TRANSFOR,
        };
        if (accountIdOrNull != null) {
          linkTokenCreateObject.access_token = accessToken;
        }
        const response = await plaidClient.linkTokenCreate(linkTokenCreateObject);
        return {
          ...response.data,
          transferIntentId: transferIntentId
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }),

  exchangePublicTokenForAccessToken: publicProcedure
    .input(z.object({
      publicToken: z.string(),
      getAccountId: z.boolean()
    }))
    .mutation(async ({ input }) => {

      const { publicToken, getAccountId } = input

      try {
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token: publicToken,
        });
        const tokenData = tokenResponse.data;

        let accountId = "";
        if (!getAccountId) {
          // Let's grab an account from the item that was just added
          const acctsResponse = await plaidClient.accountsGet({
            access_token: tokenData.access_token,
          });
          const acctsData = acctsResponse.data;
          if(!acctsData) {
            return
          }
          accountId = acctsData?.accounts[0]?.account_id ?? '';
        }

        return { 
          status: "success", 
          itemId: tokenData.item_id, 
          accessToken: tokenData.access_token, 
          accountId: accountId 
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }),


  generateLinkTokenForIdv: publicProcedure
    .input(z.object(linkTokenSchema))
    .mutation(async ({ input }) => {
      const userObject = {
        client_user_id: input.userId,
        email_address: input.email
      };

      try {
        const tokenResponse = await plaidClient.linkTokenCreate({
          user: userObject,
          products: PLAID_IDV_PRODUCTS,
          identity_verification: {
            template_id: ID_VER_TEMPLATE,
          },
          client_name: process.env.APP_NAME || 'CreditBolt',
          language: "en",
          country_codes: PLAID_COUNTRY_CODES,
        });

        return tokenResponse.data
      } catch (error: any) {
        throw new Error(error);
      }
    }),

  transferRecurringCreate: publicProcedure
    .input(z.object({
      legalName: z.string(),
      accountId: z.string(),
      accessToken: z.string(),
      amount: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ input }) => {
      const {legalName, accountId, accessToken, amount, description } = input
      const amountAsString = Number.parseFloat(amount).toFixed(2);

      const request: TransferRecurringCreateRequest = {
        access_token: accessToken,
        account_id: accountId,
        type: TransferType.Credit,
        network: TransferRecurringNetwork.Ach,
        amount: amountAsString,
        ach_class: ACHClass.Ppd,
        description: description,
        idempotency_key: uuidv4(),
        schedule: {
          start_date: moment().format('YYYY-MM-DD'),
          interval_unit: TransferScheduleIntervalUnit.Month,
          interval_count: 1,
          interval_execution_day: 5
        },
        user: {
          legal_name: legalName,
        },
      };

      try {
        const response = await plaidClient.transferRecurringCreate(request);
        if(!response.data){
          return
        }
        const recurringTransferId = response.data.recurring_transfer?.recurring_transfer_id;
        console.log(response.data)
        return recurringTransferId
      } catch (error: any) {
        // handle error
        throw new Error(error);
      }
    }),


  updateVerifyStatus: publicProcedure
    .input(z.object(updateVerifySchema))
    .mutation(async ({ ctx, input }) => {
      try {
        const { sessionId } = input
        const IDVResult = await plaidClient.identityVerificationGet({
          identity_verification_id: sessionId,
        });
        const IDVData = IDVResult.data;
        return {
          IDVData: IDVData,
          sessionId: sessionId
        };
      } catch (error: any) {
        throw new Error(error);
      }
    }),

  // getById: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.user.findFirst({
  //     where: { id: ctx.session.user.id },
  //   });

  //   return post ?? null;
  // }),
});

const getTransferIntentId = async (
  legalName: string,
  amountAsString: string,
  billId: string,
  accountIdOrNull: string,
  description: string
) => {
  const intentCreateObject: any = {
    mode: "PAYMENT", // Used for transfer going from the end-user to you
    user: {
      legal_name: legalName,
    },
    amount: amountAsString,
    description: description,
    ach_class: "ppd", // Refer to the documentation, or talk to your Plaid representative to see which class is right for you.
    iso_currency_code: "USD",
    network: "same-day-ach", // This is the default value, but I like to make it explicit
    metadata: {
      bill_id: billId,
    },
  };
  if (accountIdOrNull != null && accountIdOrNull != '') {
    intentCreateObject.account_id = accountIdOrNull;
  }

  console.log("intentCreateObject", intentCreateObject);
  const response = await plaidClient.transferIntentCreate(intentCreateObject);
  console.log("transferIntentCreate: ", response.data);
  // We'll return the transfer intent ID to the client so they can start
  // transfer UI
  return response.data.transfer_intent.id;
}
