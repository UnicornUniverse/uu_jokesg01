import { PropTypes } from "uu5g05";

export default class Types {
  static Keys = {
    awid: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    state: PropTypes.string,
    sys: PropTypes.exact({
      cts: PropTypes.string.isRequired,
      mts: PropTypes.string.isRequired,
      rev: PropTypes.number.isRequired,
    }),
  };

  static Instance = PropTypes.shape({
    awid: Types.Keys.awid.isRequired,
    id: Types.Keys.id.isRequired,
    name: Types.Keys.name.isRequired,
    state: Types.Keys.state,
    sys: Types.Keys.sys.isRequired,
  });
}
