import { Module } from '@nestjs/common';
import { Fiat } from './models';
import { FiatRepository } from './repositories';
import { FiatService } from './services';

@Module({
  providers: [
    {
      provide: 'FIAT',
      useValue: Fiat
    },
    FiatRepository,
    FiatService
  ],
  exports: [FiatService]
})
export class FiatModule {}
