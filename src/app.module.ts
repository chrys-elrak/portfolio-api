import { CommonModule } from './common/common.module';
import { ProjectService } from './common/services/project.service';
import { PublicModule } from './public/public.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';

@Module({
  imports: [
    CommonModule,
    PublicModule,
    MongooseModule.forRoot(config.dbUri, {}),
  ],
  controllers: [AppController],
  providers: [ProjectService, AppService],
})
export class AppModule {}
