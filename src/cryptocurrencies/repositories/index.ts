import { Injectable, Inject } from '@nestjs/common';
import { Cryptocurrency } from '../models';
import { safeToJson } from '../../libs/sequelize/utils';

type CryptocurrencyData = {
  id: number;
  name: string;
  symbol: string;
};

@Injectable()
export class CryptocurrencyRepository {
  constructor(
    @Inject('CRYPTOCURRENCY')
    private cryptocurrency: typeof Cryptocurrency
  ) {}

  async findAll(): Promise<CryptocurrencyData[]> {
    const cryptocurrencies = await this.cryptocurrency.findAll();
    return safeToJson(cryptocurrencies);
  }
}
