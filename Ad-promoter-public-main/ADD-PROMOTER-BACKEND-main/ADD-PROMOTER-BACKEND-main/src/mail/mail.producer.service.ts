import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Queue } from 'bull';
import { queuePool } from 'src/bull-board/bull-board.queue';

@Injectable()
export class MailService {
  private readonly baseUrl = 'https://api.ad-promoter.com/api/v1/auth';
  constructor(
    @InjectQueue('email-queue')
    private emailQueue: Queue,
  ) {
    queuePool.add(emailQueue);
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `baseurl/verifyEmail/${token}`;

    await this.emailQueue.add('verification-email', {
      user: user,
      url: url,
    });
  }

  async sendForgotPasswordConfirmation(email, token: string) {
    const url = `baseurl/forgot-password/${token}`;

    await this.emailQueue.add('forgot-password', {
      email: email,
      url,
    });
  }

  async sendInviteEmail(email, admin_name, sub_admin_name, token: string) {
    const url = `${this.baseUrl}/accept-invite?token=${token}`;
    console.log(url);
    try {
      await this.emailQueue.add(
        'invite-email',
        {
          email: email,
          url,
          admin_name,
          sub_admin_name,
        },
        {
          attempts: 5,
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
