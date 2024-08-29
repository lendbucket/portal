import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export type GlobalState = {
  currentStep: number
  info: User
  plaid: PlaidInfo
  bill: Bill
  verifyStatus: VerifyStatus
}

export type GlobalActions = {
  preStep: () => void
  nextStep: () => void
  setInfo: (value: User) => void
  setLinkToken: (value: string) => void
  setHostedLinkURL: (value: string) => void
  setPublicToken: (value: string) => void
  setAccessToken: (value: string) => void
  setItemId: (value: string) => void
  setAccountId: (value: string) => void
  setVerifyStatus: (value: VerifyStatus) => void
  setBill: (value: Bill) => void
  setTransferIntentId: (value: string) => void
  setPaymentType: (value: string) => void
  resetStore: () => void
  resetPlaidStore: () => void
}

export type GlobalStore = GlobalState & GlobalActions

export const defaultInitState: GlobalState = {
  currentStep: 1,
  info: {},
  plaid: {},
  bill: {
    id: '',
    userId: '',
    createdAt: '',
    description: '',
    amount: '',
    originalAmount: '0',
    paidTotalAmount: '0',
    pendingTotalAmount: '0',
    status: ''
  },
  verifyStatus: {
    is_verified: false,
    idv_status: undefined,
    most_recent_idv_session: ''
  },
}

export const createGlobalStore = (
  initState: GlobalState = defaultInitState,
) => {
  return createStore<GlobalStore>()(persist(
    (set) => ({
      ...initState,
      preStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      setInfo: (newValues: User) => set((state) => ({ info: { ...newValues } })),
      setLinkToken: (value: string) => set((state) => ({ plaid: { ...state.plaid, linkToken: value } })),
      setHostedLinkURL: (value: string) => set((state) => ({ plaid: { ...state.plaid, hostedLinkURL: value } })),
      setPublicToken: (value: string) => set((state) => ({ plaid: { ...state.plaid, publicToken: value } })),
      setAccessToken: (value: string) => set((state) => ({ plaid: { ...state.plaid, accessToken: value } })),
      setItemId: (value: string) => set((state) => ({ plaid: { ...state.plaid, itemId: value } })),
      setAccountId: (value: string) => set((state) => ({ plaid: { ...state.plaid, accountId: value } })),
      setTransferIntentId: (value: string) => set((state) => ({ plaid: { ...state.plaid, transferIntentId: value } })),
      setBill: (values: Bill) => set((state) => ({ bill: { ...values } })),
      setVerifyStatus: (values: VerifyStatus) => set((state) => ({ verifyStatus: { ...values } })),
      setPaymentType: (value: string) => set((state) => ({ plaid: { ...state.plaid, paymentType: value } })),
      resetStore: () => set(() => ({ ...defaultInitState })),
      resetPlaidStore: () => set((state) => ({ ...state, plaid: {} })),
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        info: {
          ...state.info,
          password: ''
        },
        plaid: state.plaid,
        bill: state.bill,
        verifyStatus: state.verifyStatus,
      }),
    }
  ))
}