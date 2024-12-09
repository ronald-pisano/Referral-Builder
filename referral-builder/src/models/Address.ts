export class Address {
  homeNameOrNumber: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;

  public constructor(
    homeNameOrNumber: string,
    street: string,
    suburb: string,
    state: string,
    postcode: string,
    country: string
  ) {
    this.homeNameOrNumber = homeNameOrNumber;
    this.street = street;
    this.suburb = suburb;
    this.state = state;
    this.postcode = postcode;
    this.country = country;
  }
}
