import { Body, Controller, Post } from "@nestjs/common";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import { CreateMessageDto } from "../dto/create-message.dto";
import { IResponse } from "../interfaces/IResponse";
import { MessageService } from "../services/message.service";

@Controller('/message')
export class MessageController {
    constructor(private readonly messageService: MessageService, @InjectSendGrid() private readonly sendGridService: SendGridService) { }

    @Post()
    async postMessage(@Body() body: CreateMessageDto): Promise<IResponse<void>> {
        await this.messageService.create(body);
        if (body.sendMeToo) {
            await this.sendGridService.send({
                from: process.env.FROM_EMAIL,
                cc: body.email,
                replyTo: process.env.REPLY_EMAIL,
                subject: body.title,
                text: body.content
            });
        }
        return { success: true, message: 'message sent successfully' } as IResponse<void>;
    }
}