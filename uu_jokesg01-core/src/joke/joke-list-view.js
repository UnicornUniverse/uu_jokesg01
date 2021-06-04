//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import Config from "./config/config";
import JokeListBoxCollection from "./joke-list-view/joke-list-box-collection";
import JokeListInline from "./joke-list-view/joke-list-inline";
import JokeDetailModal from "./joke-detail-modal";
import JokeUpdateModal from "./joke-update-modal";
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
    const [detail, setDetail] = useState({ shown: false, jokeIndex: undefined });
    const [update, setUpdate] = useState({ shown: false, jokeIndex: undefined });

    function showError(lsi, params) {
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
        colorSchema: "red",
      });
    }

    const handleLoad = useCallback(
      async (criteria) => {
        try {
          await props.jokeDataList.handlerMap.load(criteria);
        } catch {
          showError(Lsi.loadFailed);
        }
      },
      [props.jokeDataList]
    );

    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.jokeDataList.handlerMap.loadNext(pageInfo);
        } catch {
          showError(Lsi.loadNextFailed);
        }
      },
      [props.jokeDataList]
    );

    const handleReload = useCallback(async () => {
      try {
        await props.jokeDataList.handlerMap.reload();
      } catch {
        showError(Lsi.loadFailed);
      }
    }, [props.jokeDataList]);

    const handleOpenDetail = useCallback(
      (jokeIndex) => {
        setDetail({ shown: true, jokeIndex });
      },
      [props.jokeDataList, setDetail]
    );

    const handleCloseDetail = useCallback(() => {
      setDetail({ shown: false });
    }, [setDetail]);

    const handleDelete = useCallback(
      async (joke) => {
        try {
          await props.jokeDataList.handlerMap.delete(joke);
        } catch {
          showError(Lsi.deleteFailed, [joke.name]);
        }
      },
      [props.jokeDataList]
    );

    const handleAddRating = useCallback(
      async (joke, rating) => {
        try {
          await props.jokeDataList.handlerMap.addRating(joke, rating);
        } catch {
          showError(Lsi.addRatingFailed, [joke.name]);
        }
      },
      [props.jokeDataList]
    );

    const handleUpdateVisibility = useCallback(
      async (joke, visibility) => {
        try {
          await props.jokeDataList.handlerMap.updateVisibility(joke, visibility);
        } catch {
          showError(Lsi.updateVisibilityFailed, [joke.name]);
        }
      },
      [props.jokeDataList]
    );

    const handleUpdate = useCallback(
      (jokeIndex) => {
        setUpdate({ shown: true, jokeIndex });
      },
      [setUpdate]
    );

    const handleSave = useCallback(
      async (joke, values) => {
        try {
          await props.jokeDataList.handlerMap.update(joke, values);
          setUpdate({ shown: false });
        } catch {
          showError(Lsi.updateFailed, [joke.name]);
        }
      },
      [props.jokeDataList, setUpdate]
    );

    const handleCancelUpdate = useCallback(() => {
      setUpdate({ shown: false });
    }, [setUpdate]);

    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} />
        {currentNestingLevel === "boxCollection" && (
          <JokeListBoxCollection
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            onLoad={handleLoad}
            onLoadNext={handleLoadNext}
            onReload={handleReload}
            onDetail={handleOpenDetail}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        )}
        {currentNestingLevel === "inline" && (
          <JokeListInline
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            onLoad={handleLoad}
            onLoadNext={handleLoadNext}
            onReload={handleReload}
            onDetail={handleOpenDetail}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
          />
        )}
        {detail.shown && (
          <JokeDetailModal
            joke={props.jokeDataList.data[detail.jokeIndex].data}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={detail.shown}
            onClose={handleCloseDetail}
            onAddRating={handleAddRating}
          />
        )}
        {update.shown && (
          <JokeUpdateModal
            joke={props.jokeDataList.data[update.jokeIndex].data}
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

export default JokeListView;
