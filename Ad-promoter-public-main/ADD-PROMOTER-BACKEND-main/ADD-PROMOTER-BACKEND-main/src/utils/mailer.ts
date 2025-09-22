import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
    host: 'your-smtp-host',
    port: 587,
    secure: false, // Set to true if your SMTP server requires a secure connection (e.g., SSL/TLS)
    auth: {
        user: 'your-smtp-username',
        pass: 'your-smtp-password',
    },
});

async function sendInviteEmail(email: string, url: string){
    await transporter.sendMail({
        to: email,
        from: '"Support Team" <noreply@adpromoter.com>', // override default from
        subject: 'Welcome again to Nebula Ad Promoter! Forgot Password?',
    });
}