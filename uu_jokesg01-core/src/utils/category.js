import Sorter from "./category/sorter";

const Keys = Object.freeze({
  NAME: "name",
  ICON: "icon",
  SYS_CTS: "sys.cts",
  SYS_MTS: "sys.mts",
});

class Category {
  static get APP_TYPE() {
    return "category";
  }

  static get Keys() {
    return Keys;
  }

  static get Sorter() {
    return Sorter;
  }
}

export { Category };
export default Category;
