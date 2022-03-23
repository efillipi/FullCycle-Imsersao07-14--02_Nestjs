import { Controller, Get, Post, Body } from '@nestjs/common';
import { TweetsService } from '../services/tweets.service';
import { CreateTweetDto } from '../dtos/create-tweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }
}
