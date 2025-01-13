import State from "./data-object/state";
import Types from "./data-object/types";

class DataObject {
  static get Types() {
    return Types;
  }

  static get State() {
    return State;
  }

  static hasData(dataObject) {
    return [State.PENDING, State.READY, State.ERROR].includes(dataObject?.state);
  }
}

export { DataObject };
export default DataObject;
