import bcrypt from 'bcrypt';
import { DataService } from '../dataService.types';
import { Request, Response, NextFunction } from 'express';
import postgres from './databaseConnect';
import { Users, Login } from './schema';
import tokenGenerator from '../tokenGenerator';
require('dotenv').config();

export default class PostgresService implements DataService {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await postgres<Users>('users')
        .innerJoin<Login>('login', 'users.email', 'login.email')
        .where('users.email', req.body.email)
        .first();
      console.log('user :', user);
      if (!user) return res.status(400).send('email or password is incorrect');

      const validPassword = await bcrypt.compare(req.body.password, user.hash);

      if (!validPassword)
        return res.status(400).send('email or password is incorrect');

      const TWELVE_HOURS = 900000 * 4 * 12;

      res
        .cookie('webToken', tokenGenerator(user.id), {
          httpOnly: true,
          maxAge: TWELVE_HOURS
        })
        .status(200)
        .send({ userName: user.name, userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const emailExist = await postgres<Users>('users').where(
        'email',
        req.body.email
      );

      if (emailExist.length)
        return res.status(400).send('email is already in use');

      await postgres.transaction(async trx => {
        await trx<Login>('login').insert({
          email: req.body.email,
          hash: await bcrypt.hash(req.body.password, 10)
        });

        const newUser = await trx<Users>('users')
          .insert({
            name: req.body.userName,
            email: req.body.email
          })
          .returning(['id', 'name']);

        res.send({ userName: newUser[0].name, userId: newUser[0].id });
      });
    } catch (error) {
      next(error);
    }
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
