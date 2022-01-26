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
    jokeDataList: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
  },
  defaultProps: {
    preferenceDataObject: {
      state: "ready",
      data: {
        showCategories: true,
        showAuthor: true,
        showCreationTime: true,
        disableUserPreference: true,
      },
    },
  },
};

// Internal properties passed ONLY from View to ContentView
// View -> BoxView -> Content -> ContentView
// View -> InlineView -> InlineModal -> Content -> ContentView
const Internals = {
  propTypes: {
    onCopyComponent: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadNext: PropTypes.func,
    onReload: PropTypes.func,
    onCreate: PropTypes.func,
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
  },
  defaultProps: {
    onCopyComponent: () => {},
    onLoad: () => {},
    onLoadNext: () => {},
    onReload: () => {},
    onCreate: () => {},
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
};

export default { Properties, AsyncData, Internals };
