export interface Flashcard {
  id?: string;
  cardId?: string;
  front: string;
  back: string;
  image: {
    src?: string;
    alt?: string;
    thumb?: string;
  } | null;
}

export interface User {
  userName: string;
  email: string;
}

export interface Deck {
  name: string;
  editable?: boolean;
  data: Flashcard[];
}
