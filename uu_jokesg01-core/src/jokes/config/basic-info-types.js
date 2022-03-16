import { PropTypes } from "uu5g05";

// Component's other public properties that are not stored as user preference property
// Component -> View -> AreaView -> Content -> ContentView
// Component -> View -> InlineView -> InlineModal -> ContentView
const Properties = {
  propTypes: {
    expanded: PropTypes.bool,
    expandButton: PropTypes.bool,
    editButtons: PropTypes.bool,
    productInfoMask: PropTypes.string,
  },
  defaultProps: { expanded: false, expandButton: false, editButtons: true, productInfoMask: "111" },
};

// Async data objects & lists required by Content
// Provider -> View -> AreaView -> Content
// Provider -> View -> InlineView -> InlineModal -> Content
const AsyncData = {
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
  },
  defaultProps: {},
};

// Internal properties passed ONLY from View to ContentView
// View -> AreaView -> Content -> ContentView
// View -> InlineView -> InlineModal -> Content -> ContentView
const Internals = {
  propTypes: {
    onUpdate: PropTypes.func,
    onSetState: PropTypes.func,
  },
  defaultProps: {
    onUpdate: () => {},
    onSetState: () => {},
  },
};

export default { Properties, AsyncData, Internals };
