import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/IResponse';
import { Message } from 'src/common/models/Message';
import { MessageService } from 'src/common/services/message.service';
import { JwtAuthGuard } from '../jwt.auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('/admin/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(['/all', '/'])
  async getAllMessages(@Query() q): Promise<Message[]> {
    const unread = q['unread'] && q['unread'] === 'true';
    let messages = await this.messageService.getAll();
    if (unread) {
      messages = messages.filter(message => message.seen === false);
    }
    return messages;
  }

  @Get('/:id')
  async getOneMessage(@Param() params: { id: string }): Promise<IResponse<Message>> {
    const message = await this.messageService.getOneById(params.id);
    return { data: message, success: true } as IResponse<Message>;
  }

  @Put('/:id/seen')
  async markAsSeen(@Param() params: { id: string }): Promise<IResponse<Message>> {
    const message = await this.messageService.findOneAndUpdate(params.id, { seen: true });
    return { data: message, success: true } as IResponse<Message>;
  }

  @Delete('/deleteSome')
  async deleteSomeMessage(@Query() q: { id: string[] }): Promise<IResponse<void>> {
    await this.messageService.deleteSome(q.id);
    return {
      success: true,
      message: 'message deleted successfuly',
    } as IResponse<void>;
  }

  @Delete('/deleteOne/:id')
  async deleteOneMessage(@Param() params: { id: string }): Promise<IResponse<void>> {
    await this.messageService.deleteOne(params.id);
    return {
      success: true,
      message: 'message deleted successfuly',
    } as IResponse<void>;
  }

  @Delete('/deleteAll')
  async deleteAllMessage(): Promise<IResponse<void>> {
    await this.messageService.deleteAll();
    return {
      success: true,
      message: 'all messages deleted successfully',
    } as IResponse<void>;
  }

  @Post('/reply')
  replyMessage(@Body() body: any) {}
}
