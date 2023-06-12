import { Module } from '@nestjs/common';
import { Cryptocurrency } from './models';
import { CryptocurrencyRepository } from './repositories';
import { CryptocurrencyService } from './services';

@Module({
  providers: [
    {
      provide: 'CRYPTOCURRENCY',
      useValue: Cryptocurrency
    },
    CryptocurrencyRepository,
    CryptocurrencyService
  ],
  exports: [CryptocurrencyService]
})
export class CryptocurrencyModule {}
