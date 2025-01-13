import Visibility from "./visibility";

class Filter {
  static #keys = Object.freeze({
    VISIBILITY: "visibility",
  });

  static get Keys() {
    return Filter.#keys;
  }

  static get Visibility() {
    return Visibility;
  }
}

export { Filter };
export default Filter;
