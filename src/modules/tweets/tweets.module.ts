import { CacheModule, Module } from '@nestjs/common';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsService } from './services/tweets.service';
import { TweetsController } from './controllers/tweets.controller';
import { CheckNewTweetsTask } from './jobs/check-new-tweets/check-new-tweets.task';
import * as redisStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      }),
    }),
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, CheckNewTweetsTask],
})
export class TweetsModule {}
