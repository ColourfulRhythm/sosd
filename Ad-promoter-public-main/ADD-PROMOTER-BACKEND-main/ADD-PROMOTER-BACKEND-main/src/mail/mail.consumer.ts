import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Processor('email-queue')
export class MailConsumer {
    constructor(
        private mailerService: MailerService,
        private readonly httpService: HttpService,
    ) {}
    @Process('verification-email')
    async verificationEmailJob(job: Job<any>) {
        const { user, url } = job.data;

        const data = {
            to: [{ email: user.email, name: user.accountName }],
            from: {
                email: 'dannyxy@ad-promoter.com',
                name: 'Ad Promoter Team',
            },
            subject: 'Verify your Email',
            text: `Congratulations on Joining Ad Promoter, Kindly confirm your email with this url ${url}`,
            category: 'Confirmation Mail',
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': '11a0aeebeb4ce2188aa27be3a1dc2f5d',
            },
        };

        const res = await lastValueFrom(
            this.httpService
                .post('https://send.api.mailtrap.io/api/send', data, config)
                .pipe(
                    map((res) => {
                        return res.data;
                    }),
                ),
        );

        return res;
        // await this.mailerService.sendMail({
        //   to: user.email,
        //   // from: '"Support Team" <support@example.com>', // override default from
        //   subject: 'Welcome to Nebula Ad Promoter! Confirm your Email',
        //   template: './confirmation.template.hbs', // `.hbs` extension is appended automatically
        //   context: {
        //     // ✏️ filling curly brackets with content
        //     email: user.email,
        //     url,
        //   },
        // });
    }

    @Process('forgot-password')
    async verifyPasswordChangeJob(job: Job<any>) {
        const { email, url } = job.data;
        await this.mailerService.sendMail({
            to: email,
            from: '"Support Team" <noreply@adpromoter.com>', // override default from
            subject: 'Welcome again to Nebula Ad Promoter! Forgot Password?',
            template: './forgot-pass.template.hbs', // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                email: email,
                url,
            },
        });
    }

    @Process('invite-email')
    async sentInviteEmailJob(job: Job<any>) {
        try {
            const { email, url , admin_name, sub_admin_name } = job.data;
            console.log(this.mailerService.sendMail);
            console.log(job.data);
            console.log(
                await this.mailerService.sendMail({
                    to: email,
                    from: '"Support Team" <noreply@adpromoter.com>', // override default from
                    subject: 'Ad-promo ter Sub Admin Invite',
                    template: './sub-admin-invite.template.hbs', // `.hbs` extension is appended automatically
                    context: {
                        // ✏️ filling curly brackets with content
                        email: email,
                        url,
                        admin_name,
                        sub_admin_name
                    },
                }),
            );
        } catch (e) {
            console.log(e);
        }
    }
}
