//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailInline",
  nestingLevel: "inline",
  //@@viewOff:statics
};

export const JokeDetailInline = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    jokesDataObject: undefined,
    colorSchema: "default",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel} height={120}>
        <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel={currentNestingLevel} height={120}>
          TODO
        </DataObjectStateResolver>
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default JokeDetailInline;
