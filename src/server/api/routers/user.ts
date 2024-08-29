import { z } from "zod";
import moment from 'moment';
import { hash } from "bcrypt";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const schema = {
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  mobile: z.string(),
  dateBirth: z.string(),
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  country: z.string(),
  apt: z.string(),
  bill: z.any(),
  plaid: z.any(),
  verifyStatus: z.any(),
}

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object(schema))
    .mutation(async ({ ctx, input }) => {
      console.log("inout", input)
      const hashedPassword = await hash(input.password, 10);

      const { id } = await ctx.db.user.create({
        data: {
          id: input.id,
          firstname: input.firstname,
          lastname: input.lastname,
          email: input.email,
          password: hashedPassword,
          mobile: input.mobile,
          date_birth: moment(input.dateBirth).format('YYYY-MM-DD'),
          address1: input.address1,
          city: input.city,
          state: input.state,
          zipcode: input.zipcode,
          country: input.country,
          apt: input.apt,
          is_verified: input.verifyStatus.is_verified,
          idv_status: input.verifyStatus.idv_status,
          most_recent_idv_session: input.verifyStatus.most_recent_idv_session,
        },
      });
      if(!id){
        return
      }
      await ctx.db.account.create({
        data: {
          userId: id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: id,
        },
      });
      const createdBill = await ctx.db.bill.create({
        data: {
          id: input.bill.id,
          userId: String(id),
          original_amount: Number.parseFloat(input.bill.originalAmount).toFixed(2),
          paid_total_amount: Number.parseFloat(input.bill.paidTotalAmount).toFixed(2),
          pending_total_amount: Number.parseFloat(input.bill.pendingTotalAmount).toFixed(2),
          description: input.bill.description,
          status: input.bill.status
        },
      });

      await ctx.db.payment.create({
        data: {
          billId: createdBill.id,
          userId: id,
          payment_type: input.plaid.paymentType,
          account_id: input.plaid.accountId,
          plaid_intent_id: input.plaid.transferIntentId,
          amount: Number.parseFloat(input.bill.originalAmount).toFixed(2),
          status: 'waiting_for_auth'
        },
      });

      return {
        id: id,
        message: "User created successfully.",
      };
    }),

  getById: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    return post ?? null;
  }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
