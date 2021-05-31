export class UuJokesError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
  }
}

export default UuJokesError;
