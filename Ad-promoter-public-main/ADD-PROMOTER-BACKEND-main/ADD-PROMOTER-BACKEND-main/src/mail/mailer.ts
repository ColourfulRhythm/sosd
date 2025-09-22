import {MailerService} from "@nestjs-modules/mailer";
import {Injectable} from "@nestjs/common";

@Injectable()
export class Mailer{
    constructor(private mailerService: MailerService,) {}

    public async sendInviteMail(email, url){
        await this.mailerService.sendMail({
            to: email,
            from: '"Support Team" <noreply@adpromoter.com>', // override default from
            subject: 'Ad-promoter Sub Admin Invite',
            template: './sub-admin-invite.template.hbs', // `.hbs` extension is appended automatically
            context: {
                email: email,
                url,
            },
        });
    }
}