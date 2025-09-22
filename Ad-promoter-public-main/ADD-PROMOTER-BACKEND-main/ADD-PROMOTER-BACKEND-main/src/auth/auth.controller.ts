import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Res,
  Param,
  Redirect,
  Query,
  Req,
} from '@nestjs/common';
import { Response } from 'express'; // Add this import
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  GoogleSignIn,
  GoogleSignUp,
  ResetPasswordDto,
  SendOtpDto,
  SigninDto,
  verifyPhoneDto,
  verifySignupDto,
} from './dto';
import { GoogleOAuthGuard, JwtGuard } from './guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GoogleAuthSetup } from './dto/GoogleAuthSetup';
import { GetUser } from './decorator';
import { Role, UserDocument } from '../user/schemas/user.schema';
import RoleGuard from './guard/role.guard';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { SignUpResponse } from './dto/signupResponseDto';
import { UserSchemaDto } from 'src/user/dto/user.schema.dto';
import JwtRefreshGuard from './guard/jwt.refresh.guard';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() dto: SendOtpDto) {
    try {
      const res = await this.authService.sendOtp(dto);
      return {
        success: true,
        ...res,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiGenericOkResponse(SignUpResponse)
  @Post('signup')
  async signup(@Body() dto: verifySignupDto) {
    try {
      const res = await this.authService.verifySignupOtp(dto);
      return res;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard, RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  @ApiGenericOkResponse(Array<[]>)
  @Post('invite-admin')
  async inviteSubAdmin(
    @Body() dto: GoogleSignIn,
    @GetUser() user: UserDocument,
  ) {
    try {
      const res = await this.authService.inviteSubAdmin(dto.email, user);
      return res;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiGenericOkResponse(UserSchemaDto)
  @Get('accept-invite')
  async acceptInvite(
    @Query('token') token: string,
    @GetUser() user: UserDocument,
  ) {
    try {
      const res = await this.authService.acceptInvite(token, user);
      return res;
    } catch (error) {
      throw error;
    }
  }

  @Post('google-auth-setup')
  async googleAuthSetup(@Body() dto: GoogleSignUp) {
    try {
      return await this.authService.GoogleAuthSetUp(dto);
    } catch (error) {
      throw error;
    }
  }

  @Get('google-auth-signIn/:email')
  async googleAuthSignIn(@Param('email') email: string) {
    try {
      return await this.authService.GoogleAuthSignIn(email);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiGenericOkResponse(SignUpResponse)
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    try {
      return this.authService.signin(dto);
    } catch (error) {
      throw error;
    }
  }

  @Get('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  async refreshTokens(@Req() req: { user: { sub: string } }) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('forgot-password-phone')
  async forgotPasswordPhone(@Body() dto: SendOtpDto) {
    try {
      return this.authService.forgotPasswordPhone(dto.phoneNumber);
    } catch (error) {
      throw error;
    }
  }

  @Post('verify-OTP-password')
  async verifyOtpPassword(@Body() dto: verifyPhoneDto) {
    try {
      return this.authService.confirmPasswordChange(dto);
    } catch (error) {
      throw error;
    }
  }

  @Post('change-password/:token')
  async changePassword(
    @Body() dto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    try {
      return this.authService.resetPassword(token, dto);
    } catch (error) {
      throw error;
    }
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {
    console.log(req);
    return;
  }

  @Get('google-redirect')
  @Redirect('https://app.ad-promoter.com/google/success')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() response: Response) {
    const res = await this.authService.googleLogin(req);

    return {
      url: `https://app.ad-promoter.com/google/success?accessToken=${res.token}&new=${res.new}`,
    };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return this.authService.facebookLogin(req);
  }
}
