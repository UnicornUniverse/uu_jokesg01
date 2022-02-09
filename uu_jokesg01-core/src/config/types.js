import { PropTypes } from "uu5g05";
import { Text } from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";

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
    card: IdentificationBlock.propTypes.card,
    background: IdentificationBlock.propTypes.background,
    colorScheme: IdentificationBlock.propTypes.colorScheme,
    borderRadius: IdentificationBlock.propTypes.borderRadius,
    significance: IdentificationBlock.propTypes.significance,
  },
  defaultProps: {
    card: IdentificationBlock.defaultProps.card,
    background: IdentificationBlock.defaultProps.background,
    colorScheme: IdentificationBlock.defaultProps.colorScheme,
    borderRadius: IdentificationBlock.defaultProps.borderRadius,
    significance: IdentificationBlock.defaultProps.significance,
  },
};

// Required API of every component supporting inline nesting level
const Inline = {
  propTypes: {
    background: Text.propTypes.background,
    colorScheme: Text.propTypes.colorScheme,
    significance: Text.propTypes.significance,
  },
  defaultProps: {
    background: Text.defaultProps.background,
    colorScheme: Text.defaultProps.colorScheme,
    significance: Text.defaultProps.significance,
  },
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
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Box.defaultProps,
    ...IdentificationData.defaultProps,
    actionList: [],
  },
};

// Required API of every InlineView component
const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    ...IdentificationData.propTypes,
    header: PropTypes.object.isRequired,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Inline.defaultValues,
    ...IdentificationData.defaultProps,
    actionList: [],
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
