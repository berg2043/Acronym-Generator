const pg = require('pg');
const url = require('url');

// For users whose postgress require a specific username and password
const dotenv = require('dotenv');
dotenv.config();

let config = {};

// Heroku set up
if(process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: 10,
    idleTimeoutMillis: 3000,
  };
} else {
  config = {
    host: 'localhost',
    port: '5432',
    user: process.env.USERNAME || '', // Included for users whose postgres requires a username
    password: process.env.PASSWORD || '', // Included for users whose postgres requires a password
    database: 'acronym',
    max: 10,
    idleTimeoutMillis: 3000,
  }
}

// Pool using either default or Heroku settings
const pool = new pg.Pool(conifg);

// Error of idle clients
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports.pool;