interface Flashcards {
  id?: string;
  cardId?: string;
  front: string;
  back: string;
  image_id?: string | null;
  deck_id?: string;
  image_src?: string;
  image_alt?: string;
  image_thumb?: string;
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

export { Flashcards, Users, Login, Decks };
