import { Injectable, Inject } from '@nestjs/common';
import { UserBalance } from '../models';

type UserBalanceData = {
  id: number;
  user_id: number;
  crypto_asset: number;
  fiat_eq_amount: number | null;
  crypto_id: number;
  fiat_id: number;
  created_at: Date;
  updated_at: Date;
};

type Clause = Partial<Record<keyof UserBalanceData, any>>;

@Injectable()
export class UserBalanceRepository {
  constructor(
    @Inject('USER_BALANCE')
    private userBalance: typeof UserBalance
  ) {}

  updateMany(updateClause: Clause, whereClause: { where: Clause }) {
    return this.userBalance.update(updateClause, whereClause);
  }
}
