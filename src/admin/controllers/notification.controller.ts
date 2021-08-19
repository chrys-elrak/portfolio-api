import {
  Controller,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
  Put
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt.auth-guard';
import { NotificationService } from '../../common/services/notification.service';

@UseGuards(JwtAuthGuard)
@Controller('/admin/notifications')
export class NotificationController {
  constructor(
    private notificationsService: NotificationService
  ) {}

  @Get('/')
  async getNotifications(){
    return this.notificationsService.getAllNotifications();
  }

  @Get('/unread')
  async getUnreadNotifications(){
    return this.notificationsService.getUnreadNotifications();
  }

  @Get('/paginate')
  async getNotif(@Query() q){
    return this.notificationsService.getPaginateNotifications(q['start'], q['end']);
  }

  @Delete('/:id')
  async deleteOne(@Param() p){
    return this.notificationsService.deleteOne(p['id']);
  }

  @Put('/:id')
  async markAsSeen(@Param() p){
    return this.notificationsService.markSeen(p['id']);
  }

  @Delete('/')
  async deleteAll(){
    return this.notificationsService.clearNotifications();
  }
}
