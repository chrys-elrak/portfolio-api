import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AdminModule,
    CommonModule,
    MongooseModule.forRoot(process.env.DB_HOST, {}),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}