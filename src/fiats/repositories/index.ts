import { Injectable, Inject } from '@nestjs/common';
import { Fiat } from '../models';
import { safeToJson } from '../../libs/sequelize/utils';

type FiatData = {
  id: number;
  name: string;
  symbol: string;
};

@Injectable()
export class FiatRepository {
  constructor(
    @Inject('FIAT')
    private fiat: typeof Fiat
  ) {}

  async findAll(): Promise<FiatData[]> {
    const fiats = await this.fiat.findAll();
    return safeToJson(fiats);
  }
}
