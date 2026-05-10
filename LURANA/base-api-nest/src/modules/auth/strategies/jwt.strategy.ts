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
      ignoreExpiration: false, 
      secretOrKey: secret,
    });
  }

  /**
   * Sau khi Passport xác thực xong chữ ký (signature) của Token,
   * hàm validate sẽ được gọi với nội dung Payload đã giải mã.
   */
  async validate(payload: any) {
    if (!payload || !payload.roles) {
      throw new UnauthorizedException('Token không hợp lệ hoặc thiếu quyền hạn');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}