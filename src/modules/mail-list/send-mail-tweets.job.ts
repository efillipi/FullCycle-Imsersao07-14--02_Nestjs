import { Process, Processor } from '@nestjs/bull';
import { MailListService } from './mail-list.service';

@Processor('emails')
export class SendMailTweetsJob {
  constructor(private mailListService: MailListService) {}

  @Process()
  async handle() {
    const mailList = await this.mailListService.findAll();
    console.log(mailList.emails);
    console.log('kafka para enviar a mensagem para o Wesley');
  }
}

//nest       Kafka        golang
