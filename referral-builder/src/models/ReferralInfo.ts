import { Address } from "./Address";

export class ReferralInfo {
  id: number | null;
  givenName: string;
  surname: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: Address;

  public constructor(
    id: number | null,
    givenName: string,
    surname: string,
    email: string,
    phone: string,
    avatar?: string,
    address?: Address
  ) {
    this.id = id;
    this.givenName = givenName;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
    this.address = address;
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
