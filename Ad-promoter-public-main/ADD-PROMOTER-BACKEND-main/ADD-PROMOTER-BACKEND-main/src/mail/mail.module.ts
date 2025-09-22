import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.producer.service';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { Mailer } from './mailer';
import { MailConsumer } from './mail.consumer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email-queue',
            redis: {
                host: process.env.REDIS_HOSTNAME,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASSWORD,
                username: process.env.REDIS_USER,
                ttl: 42000,
            },
        }),
        MailerModule.forRoot({
            transport: {
                port: 587,
                host: 'smtp-relay.sendinblue.com',
                secure: false,
                auth: {
                    user: 'contactus@ad-promoter.com',
                    pass: 'sGaZpEwhTB9KnxC3',
                },
            },
            defaults: {
                from: 'Ad Promoter<dannyxy@adpromoter.com>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
        HttpModule,
    ],
    providers: [MailService, MailConsumer, Mailer],
    exports: [MailService, Mailer], // 👈 export for DI
})
export class MailModule {}
