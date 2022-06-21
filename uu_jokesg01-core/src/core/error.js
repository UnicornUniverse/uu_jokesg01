//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useSession } from "uu5g05";
import { PlaceholderBox } from "uu5g05-elements";
import { Unauthenticated, Unauthorized } from "uu_plus4u5g02-elements";
import { getErrorStatus, HttpStatus, getErrorLsi } from "../errors/errors";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) => Config.Css.css`
    height: ${height};
    overflow: auto
  `,
};
//@@viewOff:css

const Error = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Error",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    errorData: PropTypes.object,
    customErrorLsi: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    errorData: {},
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { state } = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const className = props.height
      ? Utils.Css.joinClassName(props.className, Css.placeholder(props.height))
      : props.className;

    const [elementProps] = Utils.VisualComponent.splitProps(props, className);
    const errorStatus = getErrorStatus(props.errorData);

    if (errorStatus === HttpStatus.Unauthorized || errorStatus === HttpStatus.Forbidden) {
      if (state === "authenticated") {
        return <Unauthorized {...elementProps} nestingLevel={props.nestingLevel} />;
      } else {
        return <Unauthenticated {...elementProps} nestingLevel={props.nestingLevel} />;
      }
    }

    const lsi = getErrorLsi(props.errorData, props.customErrorLsi);

    return <PlaceholderBox {...elementProps} code="error" header={lsi} nestingLevel={props.nestingLevel} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Error };
export default Error;
//@@viewOff:exports
