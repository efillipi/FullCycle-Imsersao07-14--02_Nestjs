import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsModule } from './modules/tweets/tweets.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailListModule } from './modules/mail-list/mail-list.module';
import { MONGO_DSN, REDIS_CONFIG } from 'src/config/server';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(MONGO_DSN, {
      useNewUrlParser: true,
    }),
    BullModule.forRoot({
      redis: REDIS_CONFIG,
    }),
    TweetsModule,
    MailListModule,
  ],
})
export class AppModule {}
