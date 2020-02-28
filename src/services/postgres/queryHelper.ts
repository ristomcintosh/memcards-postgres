import { Flashcard } from '../flashcard.types';
import Knex = require('knex');
import * as Schema from './schema';

export async function addImageToDB(newCard: Flashcard, trx: Knex) {
  let result = null;
  if (newCard.image !== null) {
    result = await trx<Schema.Images>('images')
      .insert(newCard.image)
      .returning('id');
  }
  return result;
}
