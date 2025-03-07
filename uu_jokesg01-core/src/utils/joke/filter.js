import Visibility from "./visibility";

class Filter {
  static #keys = Object.freeze({
    VISIBILITY: "visibility",
    CATEGORY_ID_LIST: "categoryIdList",
  });

  static get Keys() {
    return Filter.#keys;
  }

  static get Visibility() {
    return Visibility;
  }

  static getVisibleFilterKeyList(permission) {
    const filterKeyList = [];

    filterKeyList.push(this.Keys.CATEGORY_ID_LIST);

    if (permission.joke.canUpdateVisibility()) {
      filterKeyList.push(this.Keys.VISIBILITY);
    }

    return filterKeyList;
  }
}

export { Filter };
export default Filter;
