//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import JokeListBoxCollection from "./joke-list-view/joke-list-box-collection";
import JokeListInline from "./joke-list-view/joke-list-inline";
import Lsi from "./joke-list-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListView",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

export const JokeListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: UU5.PropTypes.object.isRequired,
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
    jokeDataList: undefined,
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

    function showError(lsi, params) {
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
        colorSchema: "red",
      });
    }

    async function handleLoad(criteria) {
      try {
        await props.jokeDataList.handlerMap.load(criteria);
      } catch {
        showError(Lsi.loadFailed);
      }
    }

    async function handleLoadNext(criteria) {
      try {
        await props.jokeDataList.handlerMap.loadNext(criteria);
      } catch {
        showError(Lsi.loadNextFailed);
      }
    }

    async function handleReload() {
      try {
        await props.jokeDataList.handlerMap.reload();
      } catch {
        showError(Lsi.loadFailed);
      }
    }

    async function handleDelete(joke) {
      try {
        await props.jokeDataList.handlerMap.delete({ id: joke.id });
      } catch {
        showError(Lsi.deleteFailed, [joke.name]);
      }
    }

    async function handleAddRating(joke, rating) {
      try {
        await props.jokeDataList.handlerMap.addRating({ id: joke.id, rating });
      } catch {
        showError(Lsi.addRatingFailed, [joke.name]);
      }
    }

    async function handleUpdateVisibility(joke, visibility) {
      try {
        await props.jokeDataList.handlerMap.updateVisibility({ id: joke.id, visibility });
      } catch {
        showError(Lsi.updateVisibilityFailed, [joke.name]);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const header = <UU5.Bricks.Lsi lsi={Lsi.header} />;
    const help = <UU5.Bricks.Lsi lsi={Lsi.help} />;

    let child;

    switch (currentNestingLevel) {
      case "boxCollection":
        child = (
          <JokeListBoxCollection
            {...props}
            {...attrs}
            header={header}
            help={help}
            nestingLevel={currentNestingLevel}
            onLoad={handleLoad}
            onLoadNext={handleLoadNext}
            onReload={handleReload}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        );
        break;
      case "inline":
      default:
        child = (
          <JokeListInline
            {...props}
            {...attrs}
            header={header}
            help={help}
            nestingLevel={currentNestingLevel}
            onLoad={handleLoad}
            onLoadNext={handleLoadNext}
            onReload={handleReload}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        );
    }

    return (
      <>
        {child}
        <UU5.Bricks.AlertBus ref_={alertBusRef} />
      </>
    );
    //@@viewOff:render
  },
});

export default JokeListView;
