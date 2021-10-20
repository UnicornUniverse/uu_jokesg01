//@@viewOn:imports
import UU5, { createComponent } from "uu5g04";
import Config from "./config/config";
import Error from "./error";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "ErrorBoundary",
  nestingLevelList: ["bigBox", "boxCollection", "box", "smallBoxCollection", "smallBox", "inline"],
  //@@viewOff:statics
};

const ErrorBoundary = createComponent({
  statics: {
    ...STATICS,

    getDerivedStateFromError(error) {
      return { error: { hasError: true, errorData: error } };
    },
  },

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  //@@viewOn:getInitialState
  getInitialState() {
    return {
      error: { hasError: false, errorData: null },
    };
  },
  //@@viewOff:getInitialState

  //@@viewOn:reactLifeCycle
  componentDidCatch(error, info) {
    console.error(error);
    // HERE you can log error to external service
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:render
  render() {
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);

    if (this.state.error.hasError) {
      return (
        <Error
          errorData={this.state.error.errorData}
          nestingLevel={currentNestingLevel}
          disabled={this.props.disabled}
          hidden={this.props.hidden}
          className={this.props.className}
          style={this.props.style}
        />
      );
    }

    return UU5.Utils.Content.getChildren(this.props.children, this.props, STATICS);
  },
  //@@viewOff:render
});

export default ErrorBoundary;
