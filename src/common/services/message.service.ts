import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message, MessageDocument } from '../models/Message';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(body: CreateMessageDto) {
      return await this.messageModel.create({
        email: body.email,
        title: body.title,
        name: body.title,
        content: body.content  
      });
  }

  async findOneAndUpdate(id: string, update) {
    return await this.messageModel.findByIdAndUpdate(id, update);
  }

  async deleteOne(id: string): Promise<void> | never {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('message not found');
    }
    await this.messageModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<void> {
    await this.messageModel.remove({});
  }

  async deleteSome(ids: string[]): Promise<void> | never {
    if (ids.some(id => !isValidObjectId(id))) {
      throw new NotFoundException('message not found');
    }
    await this.messageModel.deleteMany({ $id: {$in: ids} });
  }

  async getAll(): Promise<Message[]> {
    return await this.messageModel.find({}).sort('-date');
  }

  async getOneById(id: string): Promise<Message> | never {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('message not found');
    }
    const message = await this.messageModel.findById(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message
  }

  reply(id: string, content) {
    // TODO: send mail and store response
  }
}
