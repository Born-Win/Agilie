import { Sequelize } from 'sequelize-typescript';
import { CronJob } from 'cron';
import config = require('config');
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { UserBalanceRepository } from '../repositories';
import { CryptocurrencyService } from '../../cryptocurrencies/services';
import { FiatService } from '../../fiats/services';
import { ExchangeRateService } from '../../exchange-rates/services';
import { CRYPTOCURRENCIES, FIATS } from '../../consts';

@Injectable()
export class UserBalanceService implements OnModuleInit {
  private cronJob: CronJob;
  private readonly balanceRoundNumber = 5;

  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly cryptocurrencyService: CryptocurrencyService,
    private readonly fiatService: FiatService,
    private readonly exchangeRateService: ExchangeRateService
  ) {}

  onModuleInit() {
    this.cronJob = new CronJob(config.get<string>('cron.time'), () =>
      this.updateManyByTimestamp()
    );
    this.cronJob.start();
  }

  async updateManyByTimestamp() {
    // There are multiple approaches we can consider for this scenario:
    // 1. For the current task, where the amount of records is small, manually updating the rows using multiple requests can be a suitable solution.
    //    This approach allows for more control and flexibility when updating individual rows.
    // 2. Another option is to leverage the capabilities of PostgreSQL by utilizing functions and performing batch updates.
    //    This involves writing custom SQL functions that handle the logic for updating the rows efficiently in batches.
    //    By using this approach, we can optimize the performance of the update process and minimize the number of requests made to the database.

    const cryptocurrencies = await this.cryptocurrencyService.getAll();
    const fiats = await this.fiatService.getAll();

    const exchangeRateTable = this.exchangeRateService.getRates(
      CRYPTOCURRENCIES,
      FIATS,
      'daily'
    );

    const requestPromises: Promise<[number | number[]]>[] = [];

    for (const fiat of fiats) {
      for (const crypto of cryptocurrencies) {
        const [pair] = this.exchangeRateService.generatePairs(
          [crypto.symbol],
          [fiat.symbol]
        );
        const rate = exchangeRateTable.find(r => r.pair === pair).rate;

        const updateClause = {
          fiat_eq_amount: this.sequelize.literal(
            `(SELECT round(CAST(crypto_asset as numeric) * ${rate}, ${this.balanceRoundNumber}))`
          )
        };
        const whereClause = {
          where: {
            crypto_id: crypto.id,
            fiat_id: fiat.id
          }
        };
        const requestPr = this.userBalanceRepository.updateMany(
          updateClause,
          whereClause
        );
        requestPromises.push(requestPr);
      }
    }

    await Promise.all(requestPromises).catch(err => {
      // do something...
      console.log(err);
    });

    console.log('User balances were updated');
  }
}
