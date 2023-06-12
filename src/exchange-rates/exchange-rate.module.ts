import { Module } from '@nestjs/common';
import { ExchangeRate } from './models';
import { ExchangeRateRepository } from './repositories';
import { ExchangeRateService } from './services';
import { ExchangeRateController } from './controllers';
import { KrakenSocketClientProvider } from '../libs/kraken';

@Module({
  controllers: [ExchangeRateController],
  providers: [
    {
      provide: 'EXCHANGE_RATE',
      useFactory: () => new ExchangeRate()
    },
    ExchangeRateRepository,
    ExchangeRateService,
    KrakenSocketClientProvider
  ],
  exports: [ExchangeRateService]
})
export class ExchangeRateModule {}
