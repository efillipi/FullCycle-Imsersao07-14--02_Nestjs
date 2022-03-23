import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from '../dtos/create-tweet.dto';
import { Tweet, TweetDocument } from '../schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private tweetModel: Model<TweetDocument>,
  ) {}

  async create(createTweetDto: CreateTweetDto) {
    return await this.tweetModel.create(createTweetDto);
  }

  async findAll(
    { offset, limit }: { offset: number; limit: number } = {
      offset: 0,
      limit: 50,
    },
  ) {
    return await this.tweetModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ CreatedAt: -1 })
      .exec();
  }
}
