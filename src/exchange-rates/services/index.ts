import { Injectable } from '@nestjs/common';
import { ExchangeRateRepository } from '../repositories';
import { CRYPTOCURRENCIES, FIATS, CRYPTOCURRENCY_MAP } from '../../consts';
import {
  ExchangeRateStoreDto,
  ExchangeRateCreateDto,
  ExchangeRateReadDto
} from '../dto';
import { ExchangeRateType } from '../types';

@Injectable()
export class ExchangeRateService {
  constructor(
    private readonly exchangeRateRepository: ExchangeRateRepository
  ) {}

  savePair(data: ExchangeRateStoreDto) {
    const [crypto, fiat] = this.decodePair(data.pair);
    const currentExchangeRateData = new ExchangeRateCreateDto({
      pair: this.generatePair(CRYPTOCURRENCY_MAP[crypto], fiat),
      rate: +data.rates.p[0],
      type: 'current'
    });
    const dailyExchangeRateData = new ExchangeRateCreateDto({
      pair: this.generatePair(CRYPTOCURRENCY_MAP[crypto], fiat),
      rate: +data.rates.p[1],
      type: 'daily'
    });
    this.exchangeRateRepository.addOne(currentExchangeRateData);
    this.exchangeRateRepository.addOne(dailyExchangeRateData);
  }

  getRates(
    cryptocurrencies: string[],
    fiats: string[],
    type: ExchangeRateType
  ) {
    const foundRates: ExchangeRateReadDto[] = [];

    const pairs = this.generatePairs(cryptocurrencies, fiats);

    for (const pair of pairs) {
      const foundRate = this.exchangeRateRepository.getOneByPair(type, pair);
      foundRates.push(new ExchangeRateReadDto({ ...foundRate, pair }));
    }

    return foundRates;
  }

  generatePairs(cryptocurrencies = CRYPTOCURRENCIES, fiats = FIATS) {
    const pairs: string[] = [];

    for (const fiat of fiats) {
      for (const crypto of cryptocurrencies) {
        pairs.push(this.generatePair(crypto, fiat));
      }
    }

    return pairs;
  }

  private decodePair(pair: string) {
    return pair.split('/');
  }

  private generatePair(crypto: string, fiat: string) {
    return `${crypto}/${fiat}`;
  }
}
