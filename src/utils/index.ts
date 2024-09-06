import { subscribe } from 'diagnostics_channel';
import moment from 'moment';

export * from './signup-steps';
export * from './identity-steps';


export const getTemplateRows = (fields: FormFieldProps[]) => {
  const count = fields.length
  const filterByColSpan = fields?.filter((field: FormFieldProps) => field.colSpan === 1).length
  return count - Math.floor(filterByColSpan / 2)
}

export const getCopyRight = (copyright: string) => {
  const year = new Date().getFullYear().toString()
  return copyright.replace(new RegExp("%COPY_RIGHT%", "g"), year)
}

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const formatDate = (date: string) => {
  return moment(date).format('MMM, DD')
}
export const formatFullDate = (date: string) => {
  return moment(date).format('MMM, DD, YYYY')
}

export const formatPrice = (price: any) => {
  return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
}

export const productOneTimeFees: any = {
  'revolv': {
    oneTimeFee: 200,
    subscription: 30,
  },
  'magnum': {
    oneTimeFee: 300,
    subscription: 40,
  },
  'instal': {
    oneTimeFee: 400,
    subscription: 40,
  }
}
