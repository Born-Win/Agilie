import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'cryptocurrencies', timestamps: false })
export class Cryptocurrency extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  symbol: string;
}
