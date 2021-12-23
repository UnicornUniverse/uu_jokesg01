import Config from "./config/config";
import PropertyError from "../errors/property-error";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "provider/";

export class NoUu5IdError extends PropertyError {
  static code = ERROR_PREFIX + "no-uu5-id";

  constructor(cause) {
    super(NoUu5IdError.code, "The required property Component identifier (uu5Id) is missing!", cause);
  }
}

export default { NoUu5IdError };
