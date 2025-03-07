import Filter from "./joke/filter";
import Sorter from "./joke/sorter";

const Keys = Object.freeze({
  NAME: "name",
  TEXT: "text",
  IMAGE: "image",
  CATEGORY_ID_LIST: "categoryIdList",
  AVERAGE_RATING: "averageRating",
  RATING_COUNT: "ratingCount",
});

class Joke {
  static get APP_TYPE() {
    return "joke";
  }

  static get Keys() {
    return Keys;
  }

  static get Filter() {
    return Filter;
  }

  static get Sorter() {
    return Sorter;
  }
}

export { Joke };
export default Joke;
