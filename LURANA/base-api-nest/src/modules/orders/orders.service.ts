import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { Order } from './schemas/order.schema';
import { Product } from '../catalog/schemas/product.schema';
import { Cart } from '../cart/schemas/cart.schema';
import { OrderStatus } from 'src/common/constants/order-status.constant';
import { ListOrdersDto } from './dto/list-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async checkout(userId: string, checkoutDto: any) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel.findOne({ 
        userId: new Types.ObjectId(userId) 
      }).exec();

      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Giỏ hàng trống');
      }

      const orderItems: any[] = [];
      let total = 0;

      for (const item of cart.items) {
        const product = await this.productModel.findOneAndUpdate(
          { 
            _id: item.productId, 
            'variants.variantName': item.variantName,
            'variants.stockQty': { $gte: item.quantity } 
          },
          { $inc: { 'variants.$.stockQty': -item.quantity } },
          { session, new: true }
        ).exec();

        if (!product) {
          throw new BadRequestException(`Sản phẩm ${item.variantName} không đủ tồn kho`);
        }

        const variant = product.variants.find(v => v.variantName === item.variantName);
        if (!variant) throw new NotFoundException('Không tìm thấy biến thể');

        const subTotal = variant.priceSell * item.quantity;
        total += subTotal;
        
        orderItems.push({
          productId: item.productId,
          name: product.name,
          variantName: item.variantName,
          quantity: item.quantity,
          priceSell: variant.priceSell,
          priceImport: variant.priceImport,
          profit: (variant.priceSell - variant.priceImport) * item.quantity
        });
      }

      const orderCode = `LRN${Date.now()}`;
      const qrUrl = `https://img.vietqr.io/image/mbbank-0908112006-compact2.jpg?amount=${total}&addInfo=${orderCode}`;

      const order = new this.orderModel({
        orderCode,
        userId: new Types.ObjectId(userId),
        items: orderItems,
        totalAmount: total,
        shippingAddress: checkoutDto.address,
        paymentMethod: checkoutDto.paymentMethod,
        status: OrderStatus.PENDING,
        qrUrl,
      });

      await order.save({ session });
      await this.cartModel.deleteOne({ userId: new Types.ObjectId(userId) }).session(session);

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findAllByUser(userId: string, query: ListOrdersDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.orderModel.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.orderModel.countDocuments({ userId: new Types.ObjectId(userId) }),
    ]);
    return { data, total, page, limit };
  }

  async findOneByUser(id: string, userId: string) {
    const order = await this.orderModel.findOne({ _id: id, userId: new Types.ObjectId(userId) }).exec();
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    return order;
  }

  async findAllAdmin(query: any) {
    const { status, search, page = 1, limit = 10 } = query;
    const filters: any = {};
    if (status) filters.status = status;
    if (search) {
      filters.$or = [
        { orderCode: new RegExp(search, 'i') },
        { 'shippingAddress.phone': new RegExp(search, 'i') },
        { 'shippingAddress.fullName': new RegExp(search, 'i') }
      ];
    }
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.orderModel.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.orderModel.countDocuments(filters),
    ]);
    return { data, total, page, limit };
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    return order;
  }
}