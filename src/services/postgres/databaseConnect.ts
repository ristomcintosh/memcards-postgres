import knex from 'knex';
require('dotenv').config();

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
