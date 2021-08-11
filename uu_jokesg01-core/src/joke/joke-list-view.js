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

    const activeDataObjectId = detail.id || update.id || remove.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getJokeDataObject(props.jokeDataList, activeDataObjectId);
    }

    function showError(error) {
      alertBusRef.current.addAlert({
        content: <Error errorData={error} />,
        colorSchema: "danger",
      });
    }

    function showCreateSuccess(joke) {
      const content = (
        <>
          <UU5.Bricks.Lsi lsi={Lsi.createSuccessPrefix} />
          &nbsp;
          <UU5.Bricks.Link colorSchema="primary" onClick={() => setDetail({ shown: true, id: joke.id })}>
            {joke.name}
          </UU5.Bricks.Link>
          &nbsp;
          <UU5.Bricks.Lsi lsi={Lsi.createSuccessSuffix} />
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

    const handleOpenDetail = useCallback((jokeDataObject) => setDetail({ shown: true, id: jokeDataObject.data.id }), [
      setDetail,
    ]);

    const handleCloseDetail = useCallback(() => {
      setDetail({ shown: false });
    }, [setDetail]);

    const handleDelete = useCallback((jokeDataObject) => setRemove({ shown: true, id: jokeDataObject.data.id }), [
      setRemove,
    ]);

    const handleConfirmDelete = () => {
      setRemove({ shown: false });

      if (detail) {
        setDetail({ shown: false });
      }
    };

    const handleCancelDelete = () => setRemove({ shown: false });

    const handleAddRating = useCallback(async (rating, jokeDataObject) => {
      try {
        await jokeDataObject.handlerMap.addRating(jokeDataObject.data, rating);
      } catch (error) {
        console.error(error);
        showError(error);
      }
    }, []);

    const handleUpdateVisibility = useCallback(async (visibility, jokeDataObject) => {
      try {
        await jokeDataObject.handlerMap.updateVisibility(jokeDataObject.data, visibility);
      } catch (error) {
        showError(error);
      }
    }, []);

    const handleCreate = useCallback(() => {
      setCreate({ shown: true });
    }, [setCreate]);

    const handleConfirmCreate = (joke) => {
      setCreate({ shown: false });
      showCreateSuccess(joke);

      try {
        props.jokeDataList.handlerMap.reload();
      } catch (error) {
        showError(console.error());
      }
    };

    const handleCancelCreate = () => {
      setCreate({ shown: false });
    };

    const handleUpdate = useCallback(
      (jokeDataObject) => {
        setUpdate({ shown: true, id: jokeDataObject.data.id });
      },
      [setUpdate]
    );

    const handleConfirmUpdate = () => {
      setUpdate({ shown: false });
    };

    const handleCancelUpdate = () => {
      setUpdate({ shown: false });
    };

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
            jokeDataList={props.jokeDataList}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmCreate}
            onCancel={handleCancelCreate}
          />
        )}
        {detail.shown && activeDataObject && (
          <JokeDetailModal
            header={Lsi.detailHeader}
            jokeDataObject={activeDataObject}
            jokesPermission={props.jokesPermission}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            colorSchema={props.colorSchema}
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
            jokeDataObject={activeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        {remove.shown && activeDataObject && (
          <JokeDeleteModal
            jokeDataObject={activeDataObject}
            shown={true}
            onDelete={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getJokeDataObject(jokeDataList, id) {
  const item =
    jokeDataList.newData?.find((item) => item?.data.id === id) ||
    jokeDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default JokeListView;
