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
};

export default Lsi;
