import Config from "./config/config";
import PropertyError from "../errors/property-error";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "provider/";

export class NoOidError extends PropertyError {
  static code = ERROR_PREFIX + "no-oid";

  constructor(cause) {
    super(NoOidError.code, "The required property oid is not defined!", cause);
  }
}

export default { NoOidError };
