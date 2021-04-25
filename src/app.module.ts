import { PublicModule } from './public/public.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';

@Module({
  imports: [
    PublicModule,
    MongooseModule.forRoot(config.dbUri, {})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
