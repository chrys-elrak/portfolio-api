import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message, MessageDocument } from '../models/Message';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(body: CreateMessageDto): Promise<void> {
      const message = await this.messageModel.create({
        email: body.email,
        title: body.title,
        name: body.title,
        content: body.content  
      });
  }

  delete(id: string) {}

  getAll() {}

  getOne(id: string) {}

  reply(id: string, content) {}
}
