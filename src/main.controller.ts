import { Router } from 'express';
import { DataService } from './services/dataService.types';
import auth from './middleware/auth';
import {
  validateFlashcard,
  validateLogin,
  validateDeckName,
  validateUser
} from './middleware/clientValidation';
import unsplash from './services/unsplash/unsplash';

export default class Controller {
  public router: Router;

  private dataService: DataService;

  constructor(_dataService: DataService) {
    this.router = Router();
    this.dataService = _dataService;
    this.routes();
  }

  private routes() {
    const {
      login,
      logout,
      createUser,
      getAllDecks,
      getDeck,
      createCard,
      editCard,
      deleteDeck,
      deleteCard,
      createDeck
    } = this.dataService;
    const { router } = this;

    router.post('/login', validateLogin, login);
    router.post('/logout', logout);
    router.post('/register', validateUser, createUser);
    router.get('/decks', auth, getAllDecks);
    router.post('/deck', auth, validateDeckName, validateFlashcard, createDeck);
    router.get('/deck/:deckId', auth, getDeck);
    router.delete('/deck/:deckId', auth, deleteDeck);
    router.post('/deck/:deckId/card', auth, validateFlashcard, createCard);
    router.put('/deck/:deckId/card/:cardId', auth, validateFlashcard, editCard);
    router.delete('/deck/:deckId/card/:cardId', auth, deleteCard);
    router.get('/images', auth, unsplash);
  }
}
