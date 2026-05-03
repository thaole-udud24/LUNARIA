import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';

import { MongooseDatabaseModule } from './database/mongoose.module';
import { MailModule } from './shared/mail/mail.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CatalogModule } from './modules/catalog/catalog.module'; // 🔥 BỔ SUNG MODULE SẢN PHẨM

@Module({
  imports: [
    // 1. Cấu hình biến môi trường toàn cục
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),

    // 2. Kết nối Database (Mongoose)
    MongooseDatabaseModule,

    // 3. Shared Modules (Mail, QR, v.v.)
    MailModule,

    // 4. Feature Modules
    AuthModule,
    UsersModule,
    CatalogModule, // 🔥 ĐĂNG KÝ TRÙM TÍNH NĂNG TẠI ĐÂY ĐỂ CHẠY API
  ],
})
export class AppModule {}