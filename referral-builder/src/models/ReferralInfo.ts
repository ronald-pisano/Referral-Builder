import { Address } from "./Address";

export class ReferralInfo {
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  Address?: Address;

  public constructor(
    givenName: string,
    surname: string,
    email: string,
    phone: string,
    Address?: Address
  ) {
    this.givenName = givenName;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.Address = Address;
  }
}
