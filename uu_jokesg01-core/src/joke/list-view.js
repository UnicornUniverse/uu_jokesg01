//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState, useCallback } from "uu5g04-hooks";
import { Error } from "../core/core";
import Utils from "../utils/utils";
import Config from "./config/config";
import BoxCollectionView from "./list-view/box-collection-view";
import InlineView from "./list-view/inline-view";
import DetailModal from "./detail-view/detail-modal";
import UpdateModal from "./detail-view/update-modal";
import CreateModal from "./list-view/create-modal";
import DeleteModal from "./list-view/delete-modal";
import Lsi from "./list-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListView",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
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
  showCopyComponent: true,
  onCopyComponent: () => {},
};

export const ListView = createVisualComponent({
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
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [createData, setCreateData] = useState({ shown: false });
    const [detailData, setDetailData] = useState({ shown: false, id: undefined });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });
    const [disabled, setDisabled] = useState(false);

    const activeDataObjectId = detailData.id || updateData.id || deleteData.id;
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
          <UU5.Bricks.Link colorSchema="primary" onClick={() => setDetailData({ shown: true, id: joke.id })}>
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
        setDisabled(true);
        await Promise.all([props.jokesDataObject.handlerMap.load(), props.jokeDataList.handlerMap.reload()]);
      } catch (error) {
        console.error(error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }, [props.jokeDataList, props.jokesDataObject]);

    const handleOpenDetail = useCallback(
      (jokeDataObject) => setDetailData({ shown: true, id: jokeDataObject.data.id }),
      [setDetailData]
    );

    const handleCloseDetail = useCallback(() => {
      setDetailData({ shown: false });
    }, [setDetailData]);

    const handleDelete = useCallback((jokeDataObject) => setDeleteData({ shown: true, id: jokeDataObject.data.id }), [
      setDeleteData,
    ]);

    const handleConfirmDelete = () => {
      setDeleteData({ shown: false });

      if (detailData) {
        setDetailData({ shown: false });
      }
    };

    const handleCancelDelete = () => setDeleteData({ shown: false });

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
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleConfirmCreate = (joke) => {
      setCreateData({ shown: false });
      showCreateSuccess(joke);

      try {
        props.jokeDataList.handlerMap.reload();
      } catch (error) {
        showError(console.error());
      }
    };

    const handleCancelCreate = () => {
      setCreateData({ shown: false });
    };

    const handleUpdate = useCallback(
      (jokeDataObject) => {
        setUpdateData({ shown: true, id: jokeDataObject.data.id });
      },
      [setUpdateData]
    );

    const handleConfirmUpdate = () => {
      setUpdateData({ shown: false });
    };

    const handleCancelUpdate = () => {
      setUpdateData({ shown: false });
    };

    const handleCopyComponent = useCallback(() => {
      let uu5String = props.onCopyComponent();

      if (!uu5String) {
        uu5String = Utils.createCopyTag("UuJokes.Joke.List", props, ["baseUri"], DEFAULT_PROPS);
      }

      UU5.Utils.Clipboard.write(uu5String);

      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);

    const handleCopyJoke = useCallback(
      (jokeDataObject) => {
        const uu5String = `<UuJokes.Joke.Detail baseUri="${props.baseUri}" jokeId="${jokeDataObject.data.id}" />`;
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
          <BoxCollectionView
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            disabled={disabled || props.disabled}
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
          <InlineView
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            nestingLevel={currentNestingLevel}
            disabled={disabled || props.disabled}
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
        {createData.shown && (
          <CreateModal
            jokeDataList={props.jokeDataList}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmCreate}
            onCancel={handleCancelCreate}
          />
        )}
        {detailData.shown && activeDataObject && (
          <DetailModal
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
        {updateData.shown && (
          <UpdateModal
            jokeDataObject={activeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSave={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
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

export default ListView;
