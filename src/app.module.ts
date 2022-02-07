import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@db/analytics?authSource=admin',
      {
        useNewUrlParser: true,
      },
    ),
    TweetsModule,
  ],
})
export class AppModule {}
