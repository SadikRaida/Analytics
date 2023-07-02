import { Injectable } from '@nestjs/common';
import {SendMailDto} from "./mail.dto";
import {Resend} from "resend";

@Injectable()
export class MailService {
    private readonly resend = new Resend(process.env.RESEND_API_KEY);

    async sendMail(sendMailDto: SendMailDto) {
        try {
            const data = await this.resend.emails.send({
                from: 'noreply@j-irais-bruler-chez-vous.com',
                to: sendMailDto.to,
                subject: sendMailDto.subject,
                html: sendMailDto.text,
            });
        } catch (e) {
            console.log(e);
        }
    }
}