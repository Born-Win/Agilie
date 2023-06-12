const tableName = 'fiats';

const fiatsData = [
  {
    id: 1,
    name: 'United States Dollar',
    symbol: 'USD'
  },
  {
    id: 2,
    name: 'Euro',
    symbol: 'EUR'
  },
  {
    id: 3,
    name: 'Canadian Dollar',
    symbol: 'CAD'
  },
  {
    id: 4,
    name: 'Japanese Yen',
    symbol: 'JPY'
  },
  {
    id: 5,
    name: 'British Pound',
    symbol: 'GBP'
  },
  {
    id: 6,
    name: 'Swiss Franc',
    symbol: 'CHF'
  },
  {
    id: 7,
    name: 'Australian Dollar',
    symbol: 'AUD'
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(tableName, fiatsData);
  },

  down: queryInterface => {
    const fiatIds = fiatsData.map(f => f.id);
    return queryInterface.bulkDelete(tableName, { id: fiatIds });
  }
};
