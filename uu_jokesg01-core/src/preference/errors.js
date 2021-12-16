import Config from "./config/config";
import PropertyError from "../errors/property-error";

const ERROR_PREFIX = Config.TAG.toLowerCase().replaceAll(".", "-") + "provider/";

export class NoUserPreferenceCodeError extends PropertyError {
  static code = ERROR_PREFIX + "no-user-preference-code";

  constructor(cause) {
    super(NoUserPreferenceCodeError.code, "The userPreferenceCode property is missing!", cause);
  }
}

export default { NoUserPreferenceCodeError };
