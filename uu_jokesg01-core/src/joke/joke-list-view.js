//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import { Error } from "../core/core";
import Config from "./config/config";
import JokeListBoxCollection from "./joke-list-view/joke-list-box-collection";
import JokeListInline from "./joke-list-view/joke-list-inline";
import JokeDetailModal from "./joke-detail-view/joke-detail-modal";
import JokeUpdateModal from "./joke-detail-view/joke-update-modal";
import JokeCreateModal from "./joke-list-view/joke-create-modal";
import JokeDeleteModal from "./joke-list-view/joke-delete-modal";
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
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
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
    rowCount: undefined,
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
    const [create, setCreate] = useState({ shown: false });
    const [detail, setDetail] = useState({ shown: false, id: undefined });
    const [update, setUpdate] = useState({ shown: false, id: undefined });
    const [remove, setRemove] = useState({ shown: false, id: undefined });

    function showError(error, alertBus = alertBusRef.current) {
      alertBus.addAlert({
        content: <Error errorData={error} />,
        colorSchema: "danger",
      });
    }

    function showCreateSuccess(joke) {
      const content = (
        <>
          <UU5.Bricks.Lsi lsi={Lsi.createSuccess} params={[joke.name]} />
          <UU5.Bricks.Link colorSchema="primary" onClick={() => setDetail({ shown: true, id: joke.id })}>
            <UU5.Bricks.Icon icon="mdi-magnify" />
          </UU5.Bricks.Link>
        </>
      );

      alertBusRef.current.addAlert({
        content,
        colorSchema: "success",
        closeTimer: 5000,
      });
    }

    const handleLoad = useCallback(
      async (criteria) => {
        try {
          await props.jokeDataList.handlerMap.load(criteria);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList]
    );

    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.jokeDataList.handlerMap.loadNext(pageInfo);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList]
    );

    const handleReload = useCallback(async () => {
      try {
        await props.jokeDataList.handlerMap.reload();
      } catch (error) {
        showError(error);
      }
    }, [props.jokeDataList]);

    const handleOpenDetail = useCallback((joke) => setDetail({ shown: true, id: joke.id }), [setDetail]);

    const handleCloseDetail = useCallback(() => {
      setDetail({ shown: false });
    }, [setDetail]);

    const handleDelete = useCallback((joke) => setRemove({ shown: true, id: joke.id }), [setRemove]);

    const handleConfirmDelete = useCallback(
      async (joke) => {
        try {
          await props.jokeDataList.handlerMap.delete(joke);
          setRemove({ shown: false });
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList]
    );

    const handleCancelDelete = useCallback(() => setRemove({ shown: false }), [setRemove]);

    const handleAddRating = useCallback(
      async (rating, joke) => {
        try {
          await props.jokeDataList.handlerMap.addRating(joke, rating);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList]
    );

    const handleUpdateVisibility = useCallback(
      async (visibility, joke) => {
        try {
          await props.jokeDataList.handlerMap.updateVisibility(joke, visibility);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList]
    );

    const handleCreate = useCallback(() => {
      setCreate({ shown: true });
    }, [setCreate]);

    const handleConfirmCreate = useCallback(
      async (opt) => {
        try {
          const joke = await props.jokeDataList.handlerMap.create(opt.values);
          opt.component.saveDone();
          setCreate({ shown: false });
          showCreateSuccess(joke);
          props.jokeDataList.handlerMap.reload();
        } catch (error) {
          opt.component.saveFail();
          showError(error, opt.component.getAlertBus());
        }
      },
      [props.jokeDataList, setCreate]
    );

    const handleCancelCreate = useCallback(() => {
      setCreate({ shown: false });
    }, [setCreate]);

    const handleUpdate = useCallback(
      (joke) => {
        setUpdate({ shown: true, id: joke.id });
      },
      [setUpdate]
    );

    const handleConfirmUpdate = useCallback(
      async (opt, joke) => {
        try {
          await props.jokeDataList.handlerMap.update(joke, opt.values);
          opt.component.saveDone();
          setUpdate({ shown: false });
        } catch (error) {
          opt.component.saveFail();
          showError(error, opt.component.getAlertBus());
        }
      },
      [props.jokeDataList, setUpdate]
    );

    const handleCancelUpdate = useCallback(() => {
      setUpdate({ shown: false });
    }, [setUpdate]);

    const handleCopyComponent = useCallback(() => {
      const uu5String = props.onCopyComponent();
      UU5.Utils.Clipboard.write(uu5String);
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);

    const handleCopyJoke = useCallback(
      (joke) => {
        const uu5String = `<UuJokes.Joke.Detail baseUri="${props.baseUri}" id="${joke.id}" />`;
        UU5.Utils.Clipboard.write(uu5String);
        alertBusRef.current.addAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.copyJokeComponentSuccess} />,
          colorSchema: "success",
        });
      },
      [props]
    );
    //@@viewOff:private

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
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
            onCreate={handleCreate}
            onDetail={handleOpenDetail}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
            onCopyComponent={handleCopyComponent}
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
            onCreate={handleCreate}
            onDetail={handleOpenDetail}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddRating={handleAddRating}
            onUpdateVisibility={handleUpdateVisibility}
            onCopyComponent={handleCopyComponent}
          />
        )}
        {create.shown && (
          <JokeCreateModal
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmCreate}
            onCancel={handleCancelCreate}
          />
        )}
        {detail.shown && (
          <JokeDetailModal
            header={Lsi.detailHeader}
            jokeDataObject={getJokeDataItem(props.jokeDataList, detail.id)}
            jokesPermission={props.jokesPermission}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            showDelete={true}
            showCopyComponent={true}
            onClose={handleCloseDetail}
            onAddRating={handleAddRating}
            onUpdate={handleUpdate}
            onUpdateVisibility={handleUpdateVisibility}
            onDelete={handleDelete}
            onCopyComponent={handleCopyJoke}
          />
        )}
        {update.shown && (
          <JokeUpdateModal
            jokeDataObject={getJokeDataItem(props.jokeDataList, update.id)}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        {remove.shown && (
          <JokeDeleteModal
            jokeDataObject={getJokeDataItem(props.jokeDataList, remove.id)}
            shown={true}
            onClose={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getJokeDataItem(jokeDataList, id) {
  const item =
    jokeDataList.newData?.find((item) => item?.data.id === id) ||
    jokeDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default JokeListView;
