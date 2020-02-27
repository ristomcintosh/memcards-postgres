export interface Flashcards {
  id: string;
  front: string;
  back: string;
  image_id: string;
  deck_id: string;
}

export interface Users {
  id: string;
  email: string;
  name: string;
}

export interface Login {
  id: string;
  email: string;
  hash: string;
}

export interface Decks {
  id: string;
  deckName: string;
  user_id: string;
}

export interface Images {
  id: string;
  src: string;
  alt: string;
  thumb: string;
}
