import { Address } from "./Address";

export class ReferralInfo {
  id: number | null;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  Address?: Address;

  public constructor(
    id: number | null,
    givenName: string,
    surname: string,
    email: string,
    phone: string,
    Address?: Address
  ) {
    this.id = id;
    this.givenName = givenName;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.Address = Address;
  }
}
