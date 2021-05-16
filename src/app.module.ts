import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AdminModule,
    CommonModule,
    MongooseModule.forRoot(process.env.DB_HOST, {}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}