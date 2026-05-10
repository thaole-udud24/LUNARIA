import { IsNotEmpty, IsObject, IsEnum, IsString, IsOptional } from 'class-validator';
import { PaymentMethod } from 'src/common/constants/payment-method.constant';

export class CheckoutDto {
  @IsNotEmpty()
  @IsObject()
  address!: { // Thêm dấu ! ở đây
    fullName: string;
    phone: string;
    addressLine: string;
    province: string;
    district: string;
    ward: string;
  };

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod; // Thêm dấu ! ở đây

  @IsOptional()
  @IsString()
  note?: string; // Giữ nguyên dấu ? vì đây là trường không bắt buộc
}