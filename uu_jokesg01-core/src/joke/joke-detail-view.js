//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import Config from "./config/config";
import JokeDetailBox from "./joke-detail-view/joke-detail-box";
import JokeDetailInline from "./joke-detail-view/joke-detail-inline";
import JokeUpdateModal from "./joke-update-modal";
import Lsi from "./joke-detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const JokeDetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
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
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [update, setUpdate] = useState({ shown: false });

    function showError(lsi, params) {
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
        colorSchema: "red",
      });
    }

    async function handleAddRating(joke, rating) {
      try {
        await props.jokeDataObject.handlerMap.addRating(rating);
      } catch {
        showError(Lsi.addRatingFailed, [joke.name]);
      }
    }

    async function handleUpdateVisibility(joke, visibility) {
      try {
        await props.jokeDataObject.handlerMap.updateVisibility(visibility);
      } catch {
        showError(Lsi.updateVisibilityFailed, [joke.name]);
      }
    }

    const handleUpdate = useCallback(() => {
      setUpdate({ shown: true });
    }, [setUpdate]);

    const handleSave = useCallback(
      async (joke, values) => {
        try {
          await props.jokeDataObject.handlerMap.update(values);
          setUpdate({ shown: false });
        } catch {
          showError(Lsi.updateFailed, [joke.name]);
        }
      },
      [props.jokeDataObject, setUpdate]
    );

    const handleCancelUpdate = useCallback(() => {
      setUpdate({ shown: false });
    }, [setUpdate]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    let child;

    switch (currentNestingLevel) {
      case "box":
        child = (
          <JokeDetailBox
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            onUpdate={handleUpdate}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        );
        break;
      case "inline":
      default:
        child = (
          <JokeDetailInline
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            onUpdate={handleUpdate}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        );
    }

    return (
      <>
        {child}
        <UU5.Bricks.AlertBus ref_={alertBusRef} />
        {update.shown && (
          <JokeUpdateModal
            joke={props.jokeDataObject.data}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={update.shown}
            onSave={handleSave}
            onCancel={handleCancelUpdate}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default JokeDetailView;
