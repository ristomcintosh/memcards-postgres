import { DataService } from '../dataService.types';
import { Request, Response, NextFunction } from 'express';

export default class PostgresService implements DataService {
  login(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
  }
  createUser(req: Request, res: Response, next: NextFunction) {
    throw new Error('Method not implemented.');
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
