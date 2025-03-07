import Mode from "./filter/mode.js";

class Filter {
  static get Mode() {
    return Mode;
  }

  static convertMap2List(filterMap = {}) {
    return Object.keys(filterMap).map((key) => {
      return { key, value: filterMap[key] };
    });
  }
}

export { Filter };
export default Filter;
