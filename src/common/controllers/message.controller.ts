import { Body, Controller, Post } from "@nestjs/common";
import { CreateMessageDto } from "../dto/create-message.dto";
import { IResponse } from "../interfaces/IResponse";
import { MessageService } from "../services/message.service";

@Controller('/message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async postMessage(@Body() body: CreateMessageDto): Promise<IResponse<void>> {
        await this.messageService.create(body);
        if (body.sendMeToo) {
            // TODO: send mail to the user
        }
        return {success: true, message: 'message sent successfully'} as IResponse<void>;
    }
}