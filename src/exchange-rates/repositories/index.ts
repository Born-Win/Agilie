import { Injectable, Inject } from '@nestjs/common';
import { ExchangeRate, ExchangeRateData } from '../models';
import { ExchangeRateType } from '../types';

@Injectable()
export class ExchangeRateRepository {
  constructor(
    @Inject('EXCHANGE_RATE')
    private exchangeRate: ExchangeRate
  ) {}

  addOne(data: ExchangeRateData) {
    this.exchangeRate.set(data);
  }

  getOneByPair(type: ExchangeRateType, pair: string) {
    return this.exchangeRate.get(type, pair);
  }
}
