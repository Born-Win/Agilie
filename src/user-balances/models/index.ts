import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey
} from 'sequelize-typescript';
import { User } from '../../users/models';
import { Cryptocurrency } from '../../cryptocurrencies/models';
import { Fiat } from '../../fiats/models';

@Table({
  tableName: 'user_balances',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class UserBalance extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  crypto_asset: number;

  @Column({
    type: DataType.FLOAT
  })
  fiat_eq_amount: number;

  @ForeignKey(() => Cryptocurrency)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  crypto_id: number;

  @ForeignKey(() => Fiat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  fiat_id: number;
}
