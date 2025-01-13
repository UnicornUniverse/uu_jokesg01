class Sorter {
  static #keys = Object.freeze({
    NAME: "name",
  });

  static get Keys() {
    return Sorter.#keys;
  }
}

export { Sorter };
export default Sorter;
