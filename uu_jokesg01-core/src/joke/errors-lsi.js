import Errors from "./errors";

const Lsi = {
  [Errors.NoIdError.code]: {
    en: "The jokeId property is missing!",
    cs: "Není zadána property jokeId!",
  },
  "uu-jokes-main/joke/addRating/userNotAuthorized": {
    en: "The author is not allowed to rate own jokes.",
    cs: "Autor nemůže hodnotit vlastní vtipy.",
  },
  "uu-jokes-main/joke/create/invalidImage": {
    en: "The image file is not valid or supported image type.",
    cs: "Soubor obrázku není validní nebo podporovaný typ obrázku.",
  },
  "uu-jokes-main/joke/update/invalidImage": {
    en: "The image file is not valid or supported image type.",
    cs: "Soubor obrázku není validní nebo podporovaný typ obrázku.",
  },
};

export default Lsi;
