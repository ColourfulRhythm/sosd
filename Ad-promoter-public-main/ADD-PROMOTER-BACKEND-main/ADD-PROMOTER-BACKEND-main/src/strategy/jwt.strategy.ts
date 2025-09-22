import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
  validate(payload: {
    sub: string;
    phoneNumber?: string | null;
    email?: string | null;
    iat: number;
  }) {
    if (payload.email) {
      return this.userModel.findOne({
        email: payload.email,
      });
    }
    return this.userModel.findOne({
      phoneNumber: payload.phoneNumber,
    });
  }
}
