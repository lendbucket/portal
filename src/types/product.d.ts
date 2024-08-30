export { };

declare global {
  interface CreditBuilderLoanProps {
    id?: string;
    name: string;
    autoPay: boolean;
    nextPayment: number | string;
    progress: number;
    tracks: any;
    dueDate: string;
    createdAt: string;
  }
}
