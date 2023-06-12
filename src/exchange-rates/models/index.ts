import { Injectable } from '@nestjs/common';
import { ExchangeRateType } from '../types';

export type ExchangeRateData = {
  pair: string;
  rate: number;
  type: ExchangeRateType;
};

@Injectable()
export class ExchangeRate {
  private storage: ExchangeRateData[];

  constructor() {
    this.storage = [];
  }

  set(data: ExchangeRateData) {
    const existingRateInd = this.storage.findIndex(
      v => v.pair === data.pair && v.type === data.type
    );

    if (existingRateInd > -1) {
      return (this.storage[existingRateInd] = data);
    }

    this.storage.push(data);
  }

  get(type: ExchangeRateType, pair: string) {
    return this.storage.find(d => d.pair === pair && d.type === type) ?? null;
  }
}
