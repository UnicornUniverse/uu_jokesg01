class Filter {
  static convertMap2List(filterMap = {}) {
    return Object.keys(filterMap).map((key) => {
      return { key, value: filterMap[key] };
    });
  }
}

export { Filter };
export default Filter;
