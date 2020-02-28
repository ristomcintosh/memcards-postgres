import bcrypt from 'bcrypt';
import { DataService } from '../dataService.types';
import { Request, Response, NextFunction } from 'express';
import postgres from './databaseConnect';
import * as Schema from './schema';
import tokenGenerator from '../tokenGenerator';
import { Flashcard, Deck } from '../flashcard.types';
import Knex from 'knex';
require('dotenv').config();

export default class PostgresService implements DataService {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await postgres<Schema.Users>('users')
        .innerJoin<Schema.Login>('login', 'users.email', 'login.email')
        .where('users.email', req.body.email)
        .first();
      console.log('user :', user);
      if (!user) return res.status(400).send('email or password is incorrect');

      const validPassword = await bcrypt.compare(req.body.password, user.hash);

      if (!validPassword)
        return res.status(400).send('email or password is incorrect');

      const TWELVE_HOURS = 900000 * 4 * 12;

      return res
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
      const emailExist = await postgres<Schema.Users>('users').where(
        'email',
        req.body.email
      );

      if (emailExist.length)
        return res.status(400).send('email is already in use');

      await postgres.transaction(async trx => {
        await trx<Schema.Login>('login').insert({
          email: req.body.email,
          hash: await bcrypt.hash(req.body.password, 10)
        });

        const newUser = await trx<Schema.Users>('users')
          .insert({
            name: req.body.userName,
            email: req.body.email
          })
          .returning(['id', 'name']);

        return res.send({ userName: newUser[0].name, userId: newUser[0].id });
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllDecks(req: Request, res: Response, next: NextFunction) {
    try {
      const decks = await postgres('decks')
        .join('flashcards', 'decks.id', 'flashcards.deck_id')
        .where('user_id', req.query.userId);

      console.log(decks);
    } catch (error) {
      next(error);
    }
  }
  getDeck(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  async createDeck(req: Request, res: Response, next: NextFunction) {
    const newDeckName = req.body.deckName;
    const newCard = {
      front: req.body.card.front,
      back: req.body.card.back,
      image: req.body.card.image
    };

    try {
      await postgres.transaction(async trx => {
        const deckId = await trx<Schema.Decks>('decks')
          .insert({
            deckName: newDeckName,
            user_id: req.query.userId
          })
          .returning('id');
        const imageId = await this.addImageToDB(newCard, trx);
        const flashcardId = await trx<Schema.Flashcards>('flashcards')
          .insert({
            front: newCard.front,
            back: newCard.back,
            deck_id: deckId[0],
            image_id: imageId ? imageId[0] : null
          })
          .returning('id');
        return res.send({ cardId: flashcardId[0] }).status(201);
      });
    } catch (error) {
      next(error);
    }
  }

  private async addImageToDB(newCard: Flashcard, trx: Knex) {
    let result = null;
    if (newCard.image !== null) {
      result = await trx<Schema.Images>('images')
        .insert(newCard.image)
        .returning('id');
    }
    return result;
  }

  deleteDeck(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    const newCard = {
      front: req.body.card.front,
      back: req.body.card.back,
      image: req.body.card.image
    };

    try {
      await postgres.transaction(async trx => {
        const imageId = await this.addImageToDB(newCard, trx);
        const flashcardId = await trx<Schema.Flashcards>('flashcards')
          .insert({
            front: newCard.front,
            back: newCard.back,
            deck_id: req.query.deckId,
            image_id: imageId ? imageId[0] : null
          })
          .returning('id');

        res.status(201).send({ cardId: flashcardId[0] });
      });
    } catch (error) {
      next(error);
    }
  }
  editCard(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  deleteCard(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
}
