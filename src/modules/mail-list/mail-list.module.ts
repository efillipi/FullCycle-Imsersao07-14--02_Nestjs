import { Module } from '@nestjs/common';
import { MailListService } from './services/mail-list.service';
import { MailListController } from './controllers/mail-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MailList, MailListSchema } from './schemas/mail-list.schema';
import { SendMailTweetsJob } from './jobs/send-mail-tweets.job';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from 'src/config/server';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailList.name, schema: MailListSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: KAFKA_CONFIG.CLIENT_ID,
              connectionTimeout: parseInt(KAFKA_CONFIG.CONNECTION_TIMEOUT),
              brokers: KAFKA_CONFIG.HOST,
              ssl: KAFKA_CONFIG.USE_SSL === 'true',
              ...(KAFKA_CONFIG.SASL_USERNAME &&
                KAFKA_CONFIG.SASL_USERNAME !== '' &&
                KAFKA_CONFIG.SASL_PASSWORD &&
                KAFKA_CONFIG.SASL_PASSWORD !== '' && {
                  sasl: {
                    mechanism: 'plain',
                    username: KAFKA_CONFIG.SASL_USERNAME,
                    password: KAFKA_CONFIG.SASL_PASSWORD,
                  },
                }),
            },
          },
          consumer: {
            groupId: KAFKA_CONFIG.CONSUMER_GROUP_ID,
          },
        }),
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
