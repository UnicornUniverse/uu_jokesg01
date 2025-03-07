class Mode {
  static get ACTIVE() {
    return "active";
  }

  static get READ_ONLY() {
    return "readOnly";
  }

  static get HIDDEN() {
    return "hidden";
  }

  static #stateMap = new Map([
    [Mode.ACTIVE, { order: 1 }],
    [Mode.READ_ONLY, { order: 2 }],
    [Mode.HIDDEN, { order: 3 }],
  ]);

  static #stateList;

  static list() {
    if (!this.#stateList) {
      this.#stateList = Array.from(this.#stateMap.keys());
    }

    return this.#stateList;
  }

  static compare(a, b) {
    return this.#stateMap.get(a)?.order - this.#stateMap.get(b)?.order;
  }
}

export { Mode };
export default Mode;
