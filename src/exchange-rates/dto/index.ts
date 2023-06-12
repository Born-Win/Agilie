import { ApiProperty } from '@nestjs/swagger';
import { KrakenDataResponse } from '../../libs/kraken/types';
import { ExchangeRateType } from '../types';

export class ExchangeRateStoreDto {
  rates: {
    a: [string, number, string];
    b: [string, number, string];
    c: [string, string];
    v: [string, string];
    p: [string, string];
    t: [string, string];
    l: [string, string];
    h: [string, string];
    o: [string, string];
  };
  pair: string;

  constructor(data: KrakenDataResponse) {
    this.rates = data[1];
    this.pair = data[3];
  }
}

export class ExchangeRateCreateDto {
  pair: string;
  rate: number;
  type: ExchangeRateType;

  constructor(data) {
    this.pair = data.pair;
    this.rate = data.rate;
    this.type = data.type;
  }
}

export class ExchangeRateReadDto {
  @ApiProperty()
  pair: string;
  @ApiProperty()
  rate: number | null;

  constructor(data) {
    this.pair = data.pair;
    this.rate = data.rate ?? null;
  }
}
