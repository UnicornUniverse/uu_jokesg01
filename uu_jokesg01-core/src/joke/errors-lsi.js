import Errors from "./errors";

const Lsi = {
  [Errors.NoOidError.code]: {
    en: "The oid property is missing!",
    cs: "Není zadána property oid!",
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
  "uu-jokes-main/joke/get/jokeDoesNotExist": {
    en: "The joke does not exist.",
    cs: "Vtip neexistuje.",
  },
};

export default Lsi;
