import Config from "./config/config";
import { UuJokesError } from "../core/uu-jokes-error";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "joke-provider/";

export class PropertyError extends UuJokesError {
  constructor(code, message, cause) {
    super(code, message, cause);
  }
}
export class NoBaseUriError extends PropertyError {
  constructor(cause) {
    super(ERROR_PREFIX + "no-base-uri", "The required property baseUri is not defined!", cause);
  }
}

export class NoIdError extends PropertyError {
  constructor(cause) {
    super(ERROR_PREFIX + "no-id", "The required property id is not defined!", cause);
  }
}

export default { PropertyError, NoBaseUriError, NoIdError };
