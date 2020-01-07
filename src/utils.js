const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: SQL.STRING,
    password: SQL.STRING,
    phoneNumber: SQL.STRING,
    verificationCode: SQL.STRING,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  return { users };
};
