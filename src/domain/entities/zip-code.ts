class ZipCode {
  zipCode: string;

  street: string;

  city: string;

  state: string;

  constructor(zipCode: string, street: string, city: string, state: string) {
    this.zipCode = zipCode;
    this.street = street;
    this.city = city;
    this.state = state;
  }
}

export default ZipCode;
