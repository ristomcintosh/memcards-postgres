export interface Flashcard {
  id: string;
  front: string;
  back: string;
  image_id: string;
  deck_id: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Login {
  id: number;
  email: string;
  hash: string;
}

export interface Deck {
  id: string;
  deckName: string;
  user_id: string;
}

export interface Image {
  id: string;
  src: string;
  alt: string;
  thumb: string;
}
