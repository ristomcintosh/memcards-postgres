import { DataService } from '../dataService.types';
import { Request, Response, NextFunction } from 'express';
// import knex from './databaseConnect';
import knex from 'knex';
import { User } from './schema';
require('dotenv').config();

const postgres = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
    port: 5433
    //connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5433/${process.env.POSTGRES_DATABASE_NAME}`
  },
  debug: true
});

export default class PostgresService implements DataService {
  login(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  createUser(req: Request, res: Response, next: NextFunction) {
    // console.log(postgres);

    postgres('users')
      .select('*')
      .then(data => console.log(data))
      .catch(err => console.log(err));

    // res.send('');
  }
  getAllDecks(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  getDeck(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  createDeck(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  deleteDeck(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  createCard(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  editCard(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  deleteCard(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
}
