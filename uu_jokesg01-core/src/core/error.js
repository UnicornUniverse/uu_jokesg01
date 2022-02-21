//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useSession } from "uu5g05";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import { getErrorStatus, HttpStatus, getErrorLsi, PropertyError } from "../errors/errors";
import PropertyErrorView from "./error/property-error-view";
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

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Error",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const Error = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    moreInfo: PropTypes.bool,
    errorData: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    customErrorLsi: PropTypes.object,
    inline: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    moreInfo: false,
    errorData: {},
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    const className = props.height
      ? Utils.Css.joinClassName(props.className, Css.placeholder(props.height))
      : props.className;

    const errorStatus = getErrorStatus(props.errorData);

    if (errorStatus === HttpStatus.Unauthorized || errorStatus === HttpStatus.Forbidden) {
      if (sessionState === "authenticated") {
        // ISSUE - Plus4U5Elements - There is no alternative for UU5.Bricks.Unauthorized
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec16f3572961002969f86d
        return (
          <UU5.Bricks.Unauthorized
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={className}
            style={props.style}
          />
        );
      } else {
        // ISSUE - Unauthenticated - doesn't support nesting level inline
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec13ab572961002969f7b0

        // ISSUE - Unauthenticated - Property width does not work
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec1575572961002969f807
        return (
          <UU5.Bricks.Unauthenticated
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={className}
            style={props.style}
          />
        );
      }
    }

    const lsi = getErrorLsi(props.errorData, props.customErrorLsi);

    if (props.errorData.error instanceof PropertyError) {
      return (
        <PropertyErrorView
          nestingLevel={currentNestingLevel}
          disabled={props.disabled}
          hidden={props.hidden}
          className={className}
          style={props.style}
        >
          <Lsi lsi={lsi} />
        </PropertyErrorView>
      );
    }

    // ISSUE - Plus4U5Elements - There is no alternative for Plus4U5.Bricks.Error
    // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec1647572961002969f848

    return (
      <Plus4U5.Bricks.Error
        moreInfo={props.moreInfo}
        errorData={props.errorData}
        inline={props.inline || currentNestingLevel === "inline"}
        colorSchema="danger"
        disabled={props.disabled}
        hidden={props.hidden}
        className={className}
        style={props.style}
      >
        <Lsi lsi={lsi} />
      </Plus4U5.Bricks.Error>
    );
    //@@viewOff:render
  },
});

export default Error;
