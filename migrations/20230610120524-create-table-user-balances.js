const userBalanceTableName = 'user_balances';
const userTableName = 'users';
const cryptocurrencyTableName = 'cryptocurrencies';
const fiatTableName = 'fiats';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(userBalanceTableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: userTableName,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      crypto_asset: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      fiat_eq_amount: {
        type: DataTypes.FLOAT
      },
      crypto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: cryptocurrencyTableName,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fiat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: fiatTableName,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable(userBalanceTableName);
  }
};
