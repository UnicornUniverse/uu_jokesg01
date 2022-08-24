import { PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
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
    identificationType: IdentificationBlock.propTypes.identificationType,
  },
  defaultProps: {
    identificationType: IdentificationBlock.defaultProps.identificationType,
  },
};

// Required API of every component supporting area nesting level
const Area = {
  propTypes: {
    card: IdentificationBlock.propTypes.card,
    colorScheme: IdentificationBlock.propTypes.colorScheme,
    borderRadius: IdentificationBlock.propTypes.borderRadius,
    significance: IdentificationBlock.propTypes.significance,
    level: IdentificationBlock.propTypes.level,
  },
  defaultProps: {
    card: IdentificationBlock.defaultProps.card,
    borderRadius: IdentificationBlock.defaultProps.borderRadius,
    level: IdentificationBlock.defaultProps.level,
  },
};

// Required API of every component supporting Box (box) nesting level
const Box = {
  propTypes: {
    colorScheme: Uu5Elements.Box.propTypes.colorScheme,
    significance: Uu5Elements.Box.propTypes.significance,
    aspectRatio: Uu5Elements.Box.propTypes.aspectRatio,
    borderRadius: Uu5Elements.Box.propTypes.borderRadius,
    width: Uu5Elements.Box.propTypes.width,
    height: Uu5Elements.Box.propTypes.height,
  },
  defaultProps: {
    colorScheme: Uu5Elements.Box.defaultProps.colorScheme,
    significance: Uu5Elements.Box.defaultProps.significance,
    aspectRatio: Uu5Elements.Box.defaultProps.aspectRatio,
    width: Uu5Elements.Box.defaultProps.width,
    height: Uu5Elements.Box.defaultProps.height,
  },
};

// Required API of every component supporting spot nesting level
const Spot = {
  propTypes: {
    colorScheme: Uu5Elements.Button.propTypes.colorScheme,
    significance: Uu5Elements.Button.propTypes.significance,
    borderRadius: Uu5Elements.Button.propTypes.borderRadius,
    width: Uu5Elements.Button.propTypes.width,
    size: Uu5Elements.Button.propTypes.size,
  },
  defaultProps: {
    colorScheme: Uu5Elements.Button.defaultProps.colorScheme,
    significance: Uu5Elements.Button.defaultProps.significance,
    width: Uu5Elements.Button.defaultProps.width,
    size: Uu5Elements.Button.defaultProps.size,
  },
};

// Required API of every component supporting inline nesting level
const Inline = {
  propTypes: {
    colorScheme: Uu5Elements.Text.propTypes.colorScheme,
    significance: Uu5Elements.Text.propTypes.significance,
  },
  defaultProps: {
    colorScheme: Uu5Elements.Text.defaultProps.colorScheme,
    significance: Uu5Elements.Text.defaultProps.significance,
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

// Required API of every AreaView component
const AreaView = {
  propTypes: {
    ...Area.propTypes,
    ...IdentificationData.propTypes,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Area.defaultProps,
    ...IdentificationData.defaultProps,
    actionList: [],
  },
};

// Required API of every BoxView component
const BoxView = {
  propTypes: {
    ...Box.propTypes,
  },
  defaultProps: {
    ...Box.defaultProps,
  },
};

// Required API of every SpotView component
const SpotView = {
  propTypes: {
    ...Spot.propTypes,
  },
  defaultProps: {
    ...Spot.defaultProps,
  },
};

// Required API of every InlineView component
const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    ...IdentificationData.propTypes,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Inline.defaultValues,
    ...IdentificationData.defaultProps,
    actionList: [],
  },
};

// Required API of every DetailModal component
const DetailModal = {
  propTypes: {
    ...IdentificationData.propTypes,
    shown: PropTypes.bool,
    actionList: PropTypes.array,
    onClose: PropTypes.func,
  },
  defaultProps: {
    ...IdentificationData.defaultValues,
    shown: false,
    actionList: [],
  },
};

export default {
  Area,
  Box,
  Spot,
  Inline,
  Preference,
  Identification,
  AreaView,
  BoxView,
  SpotView,
  InlineView,
  DetailModal,
  IdentificationData,
};
