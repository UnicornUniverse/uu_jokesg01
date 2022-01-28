import { PropTypes } from "uu5g05";

// Component's other public properties that are not stored as user preference property
// Component -> View -> BoxView -> Content -> ContentView
// Component -> View -> InlineView -> InlineModal -> ContentView
const Properties = {
  propTypes: { rowCount: PropTypes.number },
  defaultProps: {},
};

// Async data objects & lists required by Content
// Provider -> View -> BoxView -> Content
// Provider -> View -> InlineView -> InlineModal -> Content
const AsyncData = {
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    categoryDataList: PropTypes.object.isRequired,
  },
  defaultProps: {},
};

// Internal properties passed ONLY from View to ContentView
// View -> BoxView -> Content -> ContentView
// View -> InlineView -> InlineModal -> Content -> ContentView
const Internals = {
  propTypes: {
    onLoad: PropTypes.func,
    onReload: PropTypes.func,
    onCreate: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  defaultProps: {
    onLoad: () => {},
    onReload: () => {},
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
};

export default { Properties, AsyncData, Internals };