import State from "./workspace/state";
import Types from "./workspace/types";

const Keys = Object.freeze({
  NAME: "name",
  STATE: "state",
});

export default class Workspace {
  static get APP_TYPE() {
    return "workspace";
  }

  static get Types() {
    return Types;
  }

  static get Keys() {
    return Keys;
  }

  static get State() {
    return State;
  }
}
