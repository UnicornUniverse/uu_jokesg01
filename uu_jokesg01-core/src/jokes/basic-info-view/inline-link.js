//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, Lsi } from "uu5g05";
import { Link } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineLink",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const InlineLink = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    onDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <span {...attrs}>
        <Lsi lsi={props.header} />
        {" - "}
        {
          // ISSUE Uu5Elements.Link - Missing property onCtrlClick
          // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebcef4572961002969f197
        }
        <Link onClick={props.onDetail} onCtrlClick={() => props.onDetail("newWindow")}>
          {props.jokesDataObject.data.name}
        </Link>
      </span>
    );
    //@@viewOff:render
  },
});

export default InlineLink;
