import { UuJokesError } from "../errors/uu-jokes-error";

class PropertyError extends UuJokesError {
  constructor(code, message, cause) {
    super(code, message, cause);
  }
}

export default PropertyError;
