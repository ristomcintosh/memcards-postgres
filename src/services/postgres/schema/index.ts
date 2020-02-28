interface Flashcards {
  id: string;
  front: string;
  back: string;
  image_id: string | null;
  deck_id: string;
}

interface Users {
  id: string;
  email: string;
  name: string;
}

interface Login {
  id: string;
  email: string;
  hash: string;
}

interface Decks {
  id: string;
  deckName: string;
  user_id: string;
}

interface Images {
  id: string;
  src: string;
  alt: string;
  thumb: string;
}

export { Flashcards, Users, Login, Decks, Images };
