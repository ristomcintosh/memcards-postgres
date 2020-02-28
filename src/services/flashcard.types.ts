export interface Flashcard {
  front: string;
  back: string;
  image: {
    src: string;
    alt: string;
    thumb: string;
  };
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
