import { Module } from '@nestjs/common';
import { MailListService } from './services/mail-list.service';
import { MailListController } from './controllers/mail-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MailList, MailListSchema } from './schemas/mail-list.schema';
import { SendMailTweetsJob } from './jobs/send-mail-tweets.job';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailList.name, schema: MailListSchema },
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['host.docker.internal:9094'],
          },
          consumer: {
            groupId: 'nest',
          },
        },
      },
    ]),
  ],
  controllers: [MailListController],
  providers: [
    MailListService,
    SendMailTweetsJob,
    {
      provide: 'KAFKA_PRODUCE',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class MailListModule {}
