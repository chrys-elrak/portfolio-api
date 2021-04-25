import { AdminModule } from './admin/admin.module';
import { CommonModule } from './common/common.module';
import { ProjectService } from './common/services/project.service';
import { PublicModule } from './public/public.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AdminModule,
    CommonModule,
    PublicModule,
    MongooseModule.forRoot(process.env.DB_HOST, {}),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [ProjectService, AppService],
})
export class AppModule {}
console.log(process.env.DB_HOST)
