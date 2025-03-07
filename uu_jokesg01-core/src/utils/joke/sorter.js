class Sorter {
  static #keys = Object.freeze({
    NAME: "name",
    RATING: "averageRating",
    CREATE_TS: "createTs",
  });

  static get Keys() {
    return Sorter.#keys;
  }
}

export { Sorter };
export default Sorter;
