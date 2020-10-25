import { Flashcard } from '../flashcard.types';
import * as Schema from './schema';

const flashcardObjForDB = ({
  front,
  back,
  image
}: Flashcard): Schema.Flashcards => ({
  front,
  back,
  image_src: image?.src,
  image_alt: image?.alt,
  image_thumb: image?.thumb
});

const flashcardObjForClient = ({
  id,
  image_src,
  image_alt,
  image_thumb,
  front,
  deck_id,
  back
}: Schema.Flashcards) => {
  return {
    id,
    front,
    back,
    deckId: deck_id,
    image: image_src
      ? {
          src: image_src,
          alt: image_alt,
          thumb: image_thumb
        }
      : null
  };
};

export { flashcardObjForDB, flashcardObjForClient };
