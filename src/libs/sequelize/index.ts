import { Sequelize } from 'sequelize-typescript';
import config = require('config');
import { Cryptocurrency } from '../../cryptocurrencies/models';
import { Fiat } from '../../fiats/models';
import { User } from '../../users/models';
import { UserBalance } from '../../user-balances/models';

export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize(config.get<string>('postgresql.url'));

    await sequelize.authenticate();

    sequelize.addModels([Cryptocurrency, Fiat, User, UserBalance]);

    await sequelize.sync({ alter: true });

    return sequelize;
  }
};
