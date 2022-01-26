import { PropTypes } from "uu5g05";

// Required API of every component using user preference property
const Preference = {
  propTypes: {
    uu5Id: PropTypes.string,
    disableUserPreference: PropTypes.bool,
  },
  defaultProps: {
    disableUserPreference: false,
  },
};

// Required API of every component showing context of uuAwsc or uuObc
const Identification = {
  propTypes: {
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
  },
  defaultProps: {
    contextType: "basic",
  },
};

// Required API of every component supporting box nesting level
const Box = {
  propTypes: {
    cardView: PropTypes.string,
    bgStyle: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorSchema: PropTypes.string,
  },
  defaultProps: {
    cardView: "full",
    bgStyle: "transparent",
    elevation: 1,
    borderRadius: "0",
    colorSchema: "default",
  },
};

// Required API of every component supporting inline nesting level
const Inline = {
  propTypes: {},
  defaultProps: {},
};

// Required API of every component view showing context of uuAwsc or uuObc
const IdentificationData = {
  propTypes: {
    ...Identification.propTypes,
    awscDataObject: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
  },
  defaultProps: {
    ...Identification.defaultProps,
    isHome: false,
  },
};

// Required API of every BoxView component
const BoxView = {
  propTypes: {
    ...Box.propTypes,
    ...IdentificationData.propTypes,
    header: PropTypes.object.isRequired,
    onCopyComponent: PropTypes.func,
    onReload: PropTypes.func,
  },
  defaultProps: {
    ...Box.defaultProps,
    ...IdentificationData.defaultProps,
    onCopyComponent: () => {},
    onReload: () => {},
  },
};

// Required API of every InlineView compoent
const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    ...IdentificationData.propTypes,
    header: PropTypes.object.isRequired,
  },
  defaultProps: {
    ...Inline.defaultValues,
    ...IdentificationData.defaultProps,
  },
};

// Required API of every InlineModal component
const InlineModal = {
  propTypes: {
    ...IdentificationData.propTypes,
    header: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    actionList: PropTypes.array,
    onClose: PropTypes.func,
  },
  defaultProps: {
    ...IdentificationData.defaultValues,
    shown: false,
    actionList: [],
    onClose: () => {},
  },
};

export default { Box, Inline, Preference, Identification, BoxView, InlineView, InlineModal, IdentificationData };
