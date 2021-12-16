import Config from "./config/config";
import PropertyError from "../errors/property-error";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "provider/";

export class NoIdError extends PropertyError {
  static code = ERROR_PREFIX + "no-id";

  constructor(cause) {
    super(NoIdError.code, "The required property id is not defined!", cause);
  }
}

export default { NoIdError };
