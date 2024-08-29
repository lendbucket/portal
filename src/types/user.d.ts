export { };

declare global {
  interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    dateBirth?: string;
    address1?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    apt?: string;
  }
}
