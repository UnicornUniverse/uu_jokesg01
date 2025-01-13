export default class State {
  static get ACTIVE() {
    return "active";
  }

  static get UNDER_CONSTRUCTION() {
    return "underConstruction";
  }

  static get CLOSED() {
    return "closed";
  }

  static #stateMap = new Map([
    [State.ACTIVE, { order: 1, active: true, icon: "uubml-state-s10-active" }],
    [State.UNDER_CONSTRUCTION, { order: 2, active: true, icon: "uubml-state-s53-warning" }],
    [State.CLOSED, { order: 3, active: true, icon: "uubml-state-s00-final" }],
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

  static getIcon(state) {
    return this.#stateMap.get(state)?.icon;
  }
}
