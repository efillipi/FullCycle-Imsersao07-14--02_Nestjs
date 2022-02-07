import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsModule } from './modules/tweets/tweets.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
    }),
    TweetsModule,
  ],
})
export class AppModule {}
