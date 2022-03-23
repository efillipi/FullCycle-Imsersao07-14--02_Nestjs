import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from '../services/tweets.service';
import { TweetsController } from './tweets.controller';

describe('TweetsController', () => {
  let controller: TweetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers: [TweetsService],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
