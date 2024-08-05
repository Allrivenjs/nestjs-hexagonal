export class Customer {
  customerId: number;
  name: string;
  email: string;
  phone: string;

  static create(name: string, email: string, phone: string): Customer {
    const customer = new Customer();
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    return customer;
  }
}
