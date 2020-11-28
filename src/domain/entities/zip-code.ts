class ZipCode {
  zipCode: string;

  street: string;

  city: string;

  state: string;

  neighborhood: string;

  constructor(zipCode: string, street: string, city: string, state: string, neighborhood:string) {
    this.zipCode = zipCode;
    this.street = street;
    this.city = city;
    this.state = state;
    this.neighborhood = neighborhood;
  }
}

export default ZipCode;
