import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { MailListService } from '../services/mail-list.service';
import { NEXT_PUBLIC_FRONT_URL } from 'src/config/server';

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
              body: `Acesse o link <a href="${NEXT_PUBLIC_FRONT_URL}/tweets"> Clique aqui </a>`,
              emails: mailList.emails,
            }),
          },
        ],
      });
      console.log(mailList.emails);
      console.log('Send to TOPIC on Kafka');
    } catch (error) {
      console.error(error);
    }
  }
}
