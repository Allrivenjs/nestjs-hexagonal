import { Customer } from './Customer';

export class Delivery {
  deliveryId: number;
  status: string;
  city: string;
  address: string;
  zipCode: string;
  state: string;
  customer: Customer;

  static create(
    status: string,
    city: string,
    address: string,
    zipCode: string,
    state: string,
    customer: Customer,
  ): Delivery {
    const delivery = new Delivery();
    delivery.status = status;
    delivery.city = city;
    delivery.address = address;
    delivery.zipCode = zipCode;
    delivery.state = state;
    delivery.customer = customer;
    return delivery;
  }
}
