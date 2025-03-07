class Visibility {
  static get ALL() {
    return "all";
  }

  static get PUBLISHED() {
    return "published";
  }

  static get UNPUBLISHED() {
    return "unpublished";
  }

  static list() {
    return [Visibility.ALL, Visibility.PUBLISHED, Visibility.UNPUBLISHED];
  }
}

export { Visibility };
export default Visibility;
