import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { MailListService } from '../services/mail-list.service';

@Processor('emails')
export class SendMailTweetsJob {
  constructor(
    private mailListService: MailListService,
    @Inject('KAFKA_PRODUCE')
    private kafkaProducer: Producer,
  ) {}

  @Process()
  async handle() {
    try {
      console.log('SendMailTweetsJob Started');

      const mailList = await this.mailListService.findAll();

      if (!mailList) {
        throw new Error('mailList is null or empty');
      }

      await this.kafkaProducer.send({
        topic: 'emails',
        messages: [
          {
            key: 'emails',
            value: JSON.stringify({
              subject: 'Novos tweets encontrados',
              body: `Acesse o link <a href="${process.env.NEXT_PUBLIC_FRONT_URL}/tweets"> Clique aqui </a>`,
              emails: mailList.emails,
            }),
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }
}
