import { Flashcard } from '../flashcard.types';
import Knex = require('knex');
import * as Schema from './schema';
import * as ObjFactory from './objFactory';

async function addFlashcardToDB(
  deckId: string,
  newCard: Flashcard,
  postgres: Knex
) {
  await postgres<Schema.Flashcards>('flashcards').insert({
    deck_id: deckId,
    ...ObjFactory.flashcardObjForDB(newCard)
  });
}

export { addFlashcardToDB };
