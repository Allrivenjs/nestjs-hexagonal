import { ChargeEntity } from './charge.entity';

export interface PaymentEntity extends ChargeEntity {
  signature: string;
  customer_email: string;
  acceptance_token: string;
}
