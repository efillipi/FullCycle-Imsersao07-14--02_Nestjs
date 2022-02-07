import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet, TweetDocument } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private tweetModel: Model<TweetDocument>,
  ) {}
  async create(createTweetDto: CreateTweetDto) {
    return await this.tweetModel.create(createTweetDto);
  }

  async findAll() {
    return await this.tweetModel.find().exec();
  }

  async findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  async remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
