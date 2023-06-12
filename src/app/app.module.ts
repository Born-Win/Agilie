import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalModule } from './global.module';
import { CryptocurrencyModule } from '../cryptocurrencies/cryptocurrency.module';
import { FiatModule } from '../fiats/fiat.module';
import { ExchangeRateModule } from '../exchange-rates/exchange-rate.module';
import { UserBalanceModule } from '../user-balances/user-balance.module';
import * as ExceptionFilters from '../exception-filters';

@Module({
  imports: [
    GlobalModule,
    CryptocurrencyModule,
    FiatModule,
    ExchangeRateModule,
    UserBalanceModule
  ],
  providers: [
    ...Object.values(ExceptionFilters).map(filter => ({
      provide: APP_FILTER,
      useClass: filter
    }))
  ]
})
export class AppModule {}
