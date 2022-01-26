import { PropTypes } from "uu5g05";

const Preference = {
  propTypes: {
    uu5Id: PropTypes.string,
    disableUserPreference: PropTypes.bool,
  },
  defaultProps: {
    disableUserPreference: false,
  },
};

const Context = {
  propTypes: {
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
  },
  defaultProps: {
    contextType: "basic",
  },
};

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

const Inline = {
  propTypes: {},
  defaultProps: {},
};

const ContextData = {
  propTypes: {
    ...Context.propTypes,
    awscDataObject: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
  },
  defaultProps: {
    ...Context.defaultProps,
    isHome: false,
  },
};

const BoxView = {
  propTypes: {
    ...Box.propTypes,
    ...ContextData.propTypes,
    header: PropTypes.object.isRequired,
    onCopyComponent: PropTypes.func,
    onReload: PropTypes.func,
  },
  defaultProps: {
    ...Box.defaultProps,
    ...ContextData.defaultProps,
    onCopyComponent: () => {},
    onReload: () => {},
  },
};

const InlineModal = {
  propTypes: {
    ...ContextData.propTypes,
    header: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    actionList: PropTypes.array,
    onClose: PropTypes.func,
  },
  defaultProps: {
    ...ContextData.defaultValues,
    shown: false,
    actionList: [],
    onClose: () => {},
  },
};

const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    ...ContextData.propTypes,
    header: PropTypes.object.isRequired,
  },
  defaultProps: {
    ...Inline.defaultValues,
    ...ContextData.defaultProps,
  },
};

export default { Box, Inline, Preference, Context, BoxView, InlineView, InlineModal, ContextData };
