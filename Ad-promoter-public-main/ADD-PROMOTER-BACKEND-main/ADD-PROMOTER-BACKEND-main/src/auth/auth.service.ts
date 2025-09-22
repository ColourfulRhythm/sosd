import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  GoogleSignUp,
  ResetPasswordDto,
  SendOtpDto,
  SigninDto,
  verifyPhoneDto,
  verifySignupDto,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { MailService } from 'src/mail/mail.producer.service';
import { OTPService } from '../utils/otp-service';
import { Role, UserDocument } from 'src/user/schemas/user.schema';
import { decodeToken, encodeToken } from '../utils/utils';
import { Mailer } from '../mail/mailer';

@Injectable()
export class AuthService {
  private passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
    private mailService: MailService,
    private otpService: OTPService,
  ) {}

  private stripCountryCode(phoneNumber: string) {
    const cleanedNumber = phoneNumber.replace(/^\+234/, '0');
    return cleanedNumber;
  }

  public async sendOtp(dto: SendOtpDto): Promise<any> {
    const account = await this.userService.findByPhoneNumber(dto.phoneNumber);
    if (account) {
      throw new ForbiddenException(
        'An account with this phoneNumber already exists',
      );
    }
    try {
      const res = await this.otpService.sendOtp(dto.phoneNumber, 'null');
      return {
        data: {
          reference_id: res.reference,
          token: res.token,
          phoneNumber: dto.phoneNumber,
        },
        msg: 'An OTP has been sent to your phone number for verification',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async verifySignupOtp(dto: verifySignupDto) {
    const res: any = await this.otpService.confirmPhoneNumber(
      dto.otp,
      dto.reference_id,
    );
    if (res.status.toLowerCase() == 'success') {
      const values = Object.values(Role);
      if (!values.includes(dto.role as unknown as Role)) {
        throw new ForbiddenException(
          'A user has to either be a placer or a promoter',
        );
      }

      const account = await this.userService.findByPhoneNumber(dto.phoneNumber);
      const accountWithEmail = await this.userService.findByEmail(dto.email);

      if (accountWithEmail || account) {
        throw new ForbiddenException(
          'An account with these credentials already exists',
        );
      }
      const SALT = 10;
      const hashedPassword = await bcrypt.hash(dto.password, SALT);

      const user = await this.userService.create({
        ...dto,
        password: hashedPassword,
      });
      user.password = undefined;

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        success: true,
        user,
        ...tokens,
        msg: 'phone number has been verified and user has been created',
      };
    } else {
      return {
        success: false,
        msg: 'invalid otp/reference_id',
      };
    }
  }

  public async inviteSubAdmin(email: string, admin: UserDocument) {
    let user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('This user does not exist');

    const token = encodeToken(user.id, user.email);
    await this.mailService.sendInviteEmail(
      email,
      admin.accountName,
      user.accountName,
      token,
    );

    return {
      success: token,
      msg: 'Admin invite sent!',
    };
  }

  public async acceptInvite(token: string, user: UserDocument) {
    try {
      const decodedToken = decodeToken(token, user.email);

      if (Math.floor(Date.now() / 1000) - decodedToken.iat > 60 * 60)
        throw new UnauthorizedException('Token expired');

      if (user.role == Role.SUBADMIN)
        throw new UnauthorizedException('Token already used');

      user = await this.userService.update(user, { role: Role.SUBADMIN });

      return {
        success: true,
        user: user,
        msg: 'Admin invite accepted!',
      };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  public async GoogleAuthSignIn(email: string) {
    let user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credentials Incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      success: true,
      user,
      ...tokens,
      msg: 'User successfully logged in',
    };
  }

  public async GoogleAuthSetUp(dto: GoogleSignUp) {
    let user = await this.userService.findByEmail(dto.email);
    if (user == null) {
      user = await this.userService.createSocialAuthUser(dto);
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      success: true,
      user,
      ...tokens,
      msg: 'User has been created',
    };
  }

  public async verifyPhone(dto: verifyPhoneDto) {
    const res: any = await this.otpService.confirmPhoneNumber(
      dto.otp,
      dto.reference_id,
    );
    if (res.status.toLowerCase() == 'success') {
      const user = await this.userService.findByPhoneNumber(res.data.phone);
      user.phoneNumberVerified = true;
      user.save();
      return {
        success: true,
        msg: 'phone number has been verified',
      };
    } else {
      return {
        success: false,
        msg: 'invalid otp/reference_id',
      };
    }
  }

  public async forgotPasswordPhone(phoneNumber: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException("There's no user with this phone number");
    }

    const res: any = await this.otpService.sendOtp(
      phoneNumber,
      user.accountName,
    );
    return {
      success: true,
      data: {
        reference_id: res.reference,
        token: res.token,
      },
      msg: 'An OTP has been sent to your phone number for verification of password change',
    };
  }

  public async confirmPasswordChange(dto: verifyPhoneDto) {
    const res = await this.verifyPhone(dto);
    const user = await this.userService.findByPhoneNumber(dto.phoneNumber);
    if (res.success) {
      const resetToken = await this.userService.createPasswordResetToken(
        user._id,
      );
      return { success: true, data: { resetToken } };
    } else {
      return {
        success: false,
        msg: 'invalid otp/reference id',
      };
    }
  }

  private async getUserFromToken(token: string) {
    const user = await this.userService.verifyResetToken(token);
    return user;
  }

  public async resetPassword(token: string, dto: ResetPasswordDto) {
    const user = await this.getUserFromToken(token);

    if (dto.password !== dto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const hashedNewPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashedNewPassword;
    const updatedUser = await this.userService.updateResetPassword(
      user._id,
      dto,
    );

    return {
      success: true,
      data: updatedUser,
      msg: 'password successfully changed',
    };
  }

  public async signin(dto: SigninDto): Promise<any> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Credentials Incorrect');
    if (!user.password)
      throw new UnauthorizedException('Credentials Incorrect');

    const pwMatch: boolean = await bcrypt.compare(dto.password, user.password);

    if (!pwMatch) throw new UnauthorizedException('Incorrect Credentials');

    if (!user.phoneNumberVerified && !user.emailVerified)
      throw new UnauthorizedException(
        'Please verify credentials to access your accunt',
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    user.password = undefined;
    return {
      success: true,
      user,
      ...tokens,
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userService.findByEmail(req.user.email);
    if (user) {
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        success: true,
        new: false,
        ...tokens,
      };
    }
    const newUser = await this.userService.createSocialAuthUser({
      accountName: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      profilePicture: req.user.picture,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    return { success: true, new: true, ...tokens };
  }

  public async facebookLogin(req: any) {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userService.findByEmail(req.user.user.email);
    if (user) {
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        success: true,
        ...tokens,
      };
    }

    const newUser = await this.userService.createSocialAuthUser({
      accountName: `${req.user.user.firstName} ${req.user.user.lastName}`,
      email: req.user.user.email,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    return {
      success: true,
      ...tokens,
    };
  }

  async getTokens(userId: string, email: string) {
    const [token, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const user = await this.userService.findById(userId);
    await this.userService.update(user, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user._id, user.email);

    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      error: false,
      data: {
        ...tokens,
        user,
      },
    };
  }
}
