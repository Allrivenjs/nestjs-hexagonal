import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
