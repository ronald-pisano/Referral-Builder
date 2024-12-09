import { Address } from "./Address";

export class ReferralInfo {
  id: number | null;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: string;
  Address?: Address;

  public constructor(
    id: number | null,
    givenName: string,
    surname: string,
    email: string,
    phone: string,
    avatar?: string,
    Address?: Address
  ) {
    this.id = id;
    this.givenName = givenName;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
    this.Address = Address;
  }
}

export const blankReferral = new ReferralInfo(
  null,
  "",
  "",
  "",
  "",
  undefined,
  new Address("", "", "", "", "", "")
);
