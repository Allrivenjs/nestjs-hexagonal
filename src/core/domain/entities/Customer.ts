export class Customer {
  customerId: number;
  name: string;
  email: string;
  phone: string;
  address: string;

  static create(
    name: string,
    email: string,
    phone: string,
    address: string,
  ): Customer {
    const customer = new Customer();
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;
    return customer;
  }
}
