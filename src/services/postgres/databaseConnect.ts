import knex from 'knex';
import { types } from 'pg';
require('dotenv').config();

/* 
In Postgres, count() returns a string
This function will cast it to an int
*/
types.setTypeParser(20, function (val) {
  return parseInt(val);
});

export default knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
    port: (process.env.POSTGRES_PORT as unknown) as number
  }
});

console.log(process.env.POSTGRES_DATABASE_NAME);
