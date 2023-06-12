import { Injectable } from '@nestjs/common';
import { CryptocurrencyRepository } from '../repositories';

@Injectable()
export class CryptocurrencyService {
  constructor(
    private readonly cryptocurrencyRepository: CryptocurrencyRepository
  ) {}

  async getAll() {
    const cryptocurrencies = await this.cryptocurrencyRepository.findAll();
    return cryptocurrencies;
  }
}
