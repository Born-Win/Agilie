const tableName = 'cryptocurrencies';

const cryptoData = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC'
  },
  {
    id: 2,
    name: 'Bitcoin Cash',
    symbol: 'BCH'
  },
  {
    id: 3,
    name: 'Ethereum',
    symbol: 'ETH'
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(tableName, cryptoData);
  },

  down: queryInterface => {
    const cryptocurrencyIds = cryptoData.map(c => c.id);
    return queryInterface.bulkDelete(tableName, { id: cryptocurrencyIds });
  }
};
