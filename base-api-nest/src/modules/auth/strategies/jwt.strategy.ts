import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      throw new Error('Missing JWT_ACCESS_SECRET in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Bắt buộc check thời gian hết hạn của token
      secretOrKey: secret,
    });
  }

  /**
   * Sau khi Passport xác thực xong chữ ký (signature) của Token,
   * hàm validate sẽ được gọi với nội dung Payload đã giải mã.
   */
  async validate(payload: any) {
    // Nếu payload trống hoặc không có thông tin cần thiết
    if (!payload || !payload.roles) {
      throw new UnauthorizedException('Token không hợp lệ hoặc thiếu quyền hạn');
    }

    // 🔥 FIX QUAN TRỌNG:
    // Trả về object này để NestJS tự động gán vào request.user.
    // Tên field 'roles' (số nhiều) PHẢI khớp với logic trong RolesGuard: user?.roles
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles, // Payload từ jwt.io của má là ["ADMIN"]
    };
  }
}