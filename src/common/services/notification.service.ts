import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument, NotificationSchema } from '../models/Notification';

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>) {}

    async getAllNotifications() {
      return await this.notificationModel.find().sort('-date');
    }

    async getUnreadNotifications() {
      const notifs = await this.getAllNotifications();
      return notifs.filter(n => n.seen === false);
    }

    async clearNotifications() {
      await this.notificationModel.remove();
    }

    async deleteOne(id: string) {
      await this.notificationModel.findOneAndDelete({ _id: id });
    }

    async markSeen(id: string) {
      await this.notificationModel.findOneAndUpdate({ _id: id }, { seen: true });
    }

    async getPaginateNotifications(start = 0, end = 5) {
      const notifs = await this.getAllNotifications();
      return notifs.slice(start, end);
    }

    async createNotification(notification: Notification) {
      await this.notificationModel.create(notification);
    }

}
