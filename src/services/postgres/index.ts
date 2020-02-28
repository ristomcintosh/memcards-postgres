import bcrypt from 'bcrypt';
import { DataService } from '../dataService.types';
import { Request, Response, NextFunction } from 'express';
import postgres from './databaseConnect';
import * as Schema from './schema';
import tokenGenerator from '../tokenGenerator';
import { Flashcard, Deck } from '../flashcard.types';
import Knex from 'knex';
import { addImageToDB } from './queryHelper';
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
      const decksIdColumnIdentifier = postgres.ref('decks.id');
      const flashcardCountQuery = postgres<Schema.Flashcards>('flashcards')
        .count('*')
        .where('deck_id', decksIdColumnIdentifier)
        .as('cardCount');
      const decks = await postgres<Schema.Decks>('decks')
        .select('deckName', 'id', flashcardCountQuery)
        .where('user_id', req.query.userId);

      res.send(decks).status(200);
    } catch (error) {
      next(error);
    }
  }
  async getDeck(req: Request, res: Response, next: NextFunction) {
    try {
      const deck = await postgres<Schema.Flashcards>('flashcards')
        .select('*', 'flashcards.id as cardId')
        .leftJoin<Schema.Images>('images', 'images.id', 'flashcards.image_id')
        .where('deck_id', req.params.deckId);

      function deckObjectFactory({
        cardId,
        src,
        alt,
        thumb,
        front,
        back
      }: Schema.Flashcards & Schema.Images) {
        return {
          cardId,
          front,
          back,
          image: src && {
            src,
            alt,
            thumb
          }
        };
      }
      res.send(deck.map(deckObjectFactory)).status(200);
    } catch (error) {
      next(error);
    }
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
        const imageId = await addImageToDB(newCard, trx);
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
        const imageId = await addImageToDB(newCard, trx);
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
