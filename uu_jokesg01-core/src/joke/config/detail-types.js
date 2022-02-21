import { PropTypes } from "uu5g05";

// Component's public properties stored as user preference property in uuMT
// Component -> PreferenceProvider -> View -> AreaView -> Content -> ContentView
// Component -> PreferenceProvider -> View -> InlineView -> InlineModal -> Content -> ContentView
const Preferences = {
  propTypes: {
    showCategories: PropTypes.bool,
    showAuthor: PropTypes.bool,
    showCreationTime: PropTypes.bool,
  },
  defaultProps: {
    showCategories: true,
    showAuthor: true,
    showCreationTime: true,
  },
};

// Component's other public properties that are not stored as user preference property
// Component -> View -> AreaView -> Content -> ContentView
// Component -> View -> InlineView -> InlineModal -> ContentView
const Properties = {
  propTypes: {},
  defaultProps: {},
};

// Async data objects & lists required by Content
// Provider -> View -> AreaView -> Content
// Provider -> View -> InlineView -> InlineModal -> Content
const AsyncData = {
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object,
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
// View -> AreaView -> Content -> ContentView
// View -> InlineView -> InlineModal -> Content -> ContentView
const Internals = {
  propTypes: {
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onDelete: PropTypes.func,
    onCopyComponent: PropTypes.func,
  },
  defaultProps: {
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onDelete: () => {},
    onCopyComponent: () => {},
  },
};

export default { AsyncData, Preferences, Properties, Internals };
