import { databaseProvider as Postgres } from '../libs/sequelize';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [Postgres],
  exports: [Postgres.provide]
})
export class GlobalModule {}
