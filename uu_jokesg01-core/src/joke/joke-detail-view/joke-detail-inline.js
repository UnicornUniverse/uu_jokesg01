//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import JokeDetailLink from "./joke-detail-link";
import JokeDetailModal from "./joke-detail-modal";
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
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: false,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataObject.data !== null;

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel} {...attrs}>
          <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel={currentNestingLevel} {...attrs}>
            {isDataLoaded && (
              <>
                <JokeDetailLink
                  header={props.header}
                  joke={props.jokeDataObject.data}
                  onDetail={() => setIsModal(true)}
                />
                <JokeDetailModal
                  header={props.header}
                  jokeDataObject={props.jokeDataObject}
                  jokesPermission={props.jokesPermission}
                  categoryList={props.jokesDataObject.data.categoryList}
                  baseUri={props.baseUri}
                  shown={isModal}
                  onClose={() => setIsModal(false)}
                  onAddRating={props.onAddRating}
                  onUpdate={props.onUpdate}
                  onUpdateVisibility={props.onUpdateVisibility}
                  onCopyComponent={props.onCopyComponent}
                  showCopyComponent={props.showCopyComponent}
                />
              </>
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

export default JokeDetailInline;
