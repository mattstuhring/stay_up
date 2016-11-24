'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/stayup_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/stayup_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
