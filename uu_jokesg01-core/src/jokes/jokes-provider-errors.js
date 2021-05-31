import Config from "./config/config";
import { UuJokesError } from "../core/core";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "joke-workspace-provider/";

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

export default { PropertyError, NoBaseUriError };
