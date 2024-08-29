import { Configuration, PlaidEnvironments, PlaidApi, CountryCode, Products } from 'plaid'
import { v4 as uuidv4 } from 'uuid';

export const PLAID_ENV = (process.env.PLAID_ENV || "sandbox").toLowerCase();
export const ID_VER_TEMPLATE = process.env.TEMPLATE_ID || '';

export const PLAID_TRANSFER_PRODUCTS = [
  Products.Transfer
]

export const PLAID_IDV_PRODUCTS = [
  Products.IdentityVerification
]

export const PLAID_COUNTRY_CODES = [CountryCode.Us];

export const WEBHOOK_URL_FOR_TRANSFOR = process.env.WEBHOOK_URL_FOR_TRANSFOR

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});
export const plaidClient = new PlaidApi(plaidConfig);


export const MEMBERSHIP_FEE = '90';


export const generateBill = (userId: string, amount: string, description: string) => {
  return {
    id:uuidv4(),
    userId: userId,
    createdAt: new Date().toISOString(),
    description,
    originalAmount: amount, 
    paidTotalAmount: '0', 
    pendingTotalAmount: '0',
    status:"unpaid"
  }
}