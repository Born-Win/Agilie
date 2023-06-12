const tableName = 'user_balances';

const now = new Date();

const userBalancesData = [
  {
    id: 1,
    user_id: 1,
    crypto_id: 3,
    fiat_id: 6,
    crypto_asset: 0.01848,
    fiat_eq_amount: 29.35889,
    created_at: now,
    updated_at: now
  },
  {
    id: 2,
    user_id: 2,
    crypto_id: 3,
    fiat_id: 5,
    crypto_asset: 0.02311,
    fiat_eq_amount: 32.22607,
    created_at: now,
    updated_at: now
  },
  {
    id: 3,
    user_id: 3,
    crypto_id: 1,
    fiat_id: 4,
    crypto_asset: 1.40139,
    fiat_eq_amount: 5037675.47023,
    created_at: now,
    updated_at: now
  },
  {
    id: 4,
    user_id: 4,
    crypto_id: 1,
    fiat_id: 5,
    crypto_asset: 0.30527,
    fiat_eq_amount: 6271.96315,
    created_at: now,
    updated_at: now
  },
  {
    id: 5,
    user_id: 5,
    crypto_id: 1,
    fiat_id: 2,
    crypto_asset: 1.00924,
    fiat_eq_amount: 24260.88907,
    created_at: now,
    updated_at: now
  },
  {
    id: 6,
    user_id: 6,
    crypto_id: 1,
    fiat_id: 5,
    crypto_asset: 0.16699,
    fiat_eq_amount: 3430.91403,
    created_at: now,
    updated_at: now
  },
  {
    id: 7,
    user_id: 7,
    crypto_id: 1,
    fiat_id: 3,
    crypto_asset: 1.44878,
    fiat_eq_amount: 49712.19929,
    created_at: now,
    updated_at: now
  },
  {
    id: 8,
    user_id: 8,
    crypto_id: 2,
    fiat_id: 5,
    crypto_asset: 0.15583,
    fiat_eq_amount: 12.72409,
    created_at: now,
    updated_at: now
  },
  {
    id: 9,
    user_id: 9,
    crypto_id: 1,
    fiat_id: 1,
    crypto_asset: 0.3333,
    fiat_eq_amount: 8589.35105,
    created_at: now,
    updated_at: now
  },
  {
    id: 10,
    user_id: 10,
    crypto_id: 1,
    fiat_id: 1,
    crypto_asset: 1.70189,
    fiat_eq_amount: 43858.77783,
    created_at: now,
    updated_at: now
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(tableName, userBalancesData);
  },

  down: queryInterface => {
    const userBalanceIds = userBalancesData.map(b => b.id);
    return queryInterface.bulkDelete(tableName, { id: userBalanceIds });
  }
};
