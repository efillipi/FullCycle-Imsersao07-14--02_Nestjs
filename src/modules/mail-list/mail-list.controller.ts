import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MailListService } from './mail-list.service';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { Response } from 'express';

@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}

  @Post()
  create(@Body() createMailListDto: CreateMailListDto) {
    return this.mailListService.create(createMailListDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const mail = await this.mailListService.findAll();
    return !mail
      ? res.status(HttpStatus.NO_CONTENT).json(null)
      : res.json(mail);
  }
}
