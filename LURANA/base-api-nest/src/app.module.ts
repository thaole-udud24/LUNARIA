import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Config & Database
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';
import { MongooseDatabaseModule } from './database/mongoose.module';

// Shared Utilities (Tiện ích dùng chung)
import { MailModule } from './shared/mail/mail.module';

// Feature Modules (Module nghiệp vụ)
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { CartModule } from './modules/cart/cart.module'; // 🔥 MỚI: Quản lý giỏ hàng
import { OrdersModule } from './modules/orders/orders.module'; // 🔥 MỚI: Đặt hàng & Tiện ích Admin

@Module({
  imports: [
    // 1. Cấu hình biến môi trường toàn cục (isGlobal: true)
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // 2. Kết nối Database (Mongoose)
    MongooseDatabaseModule,

    // 3. Shared Modules (Tiện ích Mail, v.v.)
    MailModule,

    // 4. Feature Modules - Luồng nghiệp vụ chính
    AuthModule,
    UsersModule,
    CatalogModule, // Quản lý Sản phẩm, Danh mục, Loại da
    CartModule,    // Giỏ hàng: Cho khách gom mỹ phẩm
    OrdersModule,  //Đặt hàng: Xử lý Checkout & Quản trị đơn hàng cho Admin
  ],
})
export class AppModule {}