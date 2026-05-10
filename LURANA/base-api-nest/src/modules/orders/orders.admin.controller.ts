import { Controller, Get, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from 'src/common/constants/order-status.constant';

@Controller('admin/orders')
export class OrdersAdminController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get() 
  async getOrders(@Query() query: any) {
    return this.ordersService.findAllAdmin(query);
  }

  @Patch(':id/confirm') 
  async confirm(@Param('id') id: string) {
    return this.ordersService.updateStatus(id, OrderStatus.CONFIRMED);
  }
}