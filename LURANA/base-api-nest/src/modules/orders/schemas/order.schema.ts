import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from 'src/common/constants/order-status.constant';
import { PaymentMethod } from 'src/common/constants/payment-method.constant';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, unique: true })
  orderCode!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Array, required: true })
  items!: any[]; // Snapshot: name, variant, priceSell, priceImport (tính lợi nhuận)

  @Prop({ required: true })
  totalAmount!: number;

  @Prop({ type: Object, required: true })
  shippingAddress!: any;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Prop({ enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod!: PaymentMethod;
}
export const OrderSchema = SchemaFactory.createForClass(Order);