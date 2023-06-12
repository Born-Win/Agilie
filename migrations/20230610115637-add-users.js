const tableName = 'users';

const usersData = [
  {
    id: 1,
    full_name: 'Mable Larson'
  },
  {
    id: 2,
    full_name: 'Tracy Cassin'
  },
  {
    id: 3,
    full_name: 'Noah Schmeler'
  },
  {
    id: 4,
    full_name: 'Tyrone Green'
  },
  {
    id: 5,
    full_name: 'Casey Koelpin'
  },
  {
    id: 6,
    full_name: 'Arturo Schulist'
  },
  {
    id: 7,
    full_name: 'Francisco Doyle'
  },
  {
    id: 8,
    full_name: 'Catherine Kub'
  },
  {
    id: 9,
    full_name: 'Lucia Bartoletti'
  },
  {
    id: 10,
    full_name: 'Austin Block'
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(tableName, usersData);
  },

  down: queryInterface => {
    const userIds = usersData.map(u => u.id);
    return queryInterface.bulkDelete(tableName, { id: userIds });
  }
};
