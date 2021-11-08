const config = require('../config').db

module.exports = {
  "development": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // }
}
