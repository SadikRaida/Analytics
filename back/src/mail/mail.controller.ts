import {Body, Controller, Post} from '@nestjs/common';
import {MailService} from "./mail.service";
import {SendMailDto} from "./mail.dto";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post()
    async create(@Body() sendMailDto: SendMailDto) {
        return await this.mailService.sendMail(sendMailDto);
    }
}
