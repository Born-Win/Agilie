import { Injectable } from '@nestjs/common';
import { FiatRepository } from '../repositories';

@Injectable()
export class FiatService {
  constructor(private readonly fiatRepository: FiatRepository) {}

  async getAll() {
    const fiats = await this.fiatRepository.findAll();
    return fiats;
  }
}
