import { Module } from '@nestjs/common';
import { UserBalance } from './models';
import { UserBalanceRepository } from './repositories';
import { UserBalanceService } from './services';
import { ExchangeRateModule } from '../exchange-rates/exchange-rate.module';
import { CryptocurrencyModule } from '../cryptocurrencies/cryptocurrency.module';
import { FiatModule } from '../fiats/fiat.module';

@Module({
  imports: [ExchangeRateModule, CryptocurrencyModule, FiatModule],
  controllers: [],
  providers: [
    {
      provide: 'USER_BALANCE',
      useValue: UserBalance
    },
    UserBalanceRepository,
    UserBalanceService
  ],
  exports: []
})
export class UserBalanceModule {}
