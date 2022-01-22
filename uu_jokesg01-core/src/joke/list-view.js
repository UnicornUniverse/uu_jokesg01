//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, useRef, useState, useCallback, Lsi } from "uu5g05";
import { Link } from "uu5g05-elements";
import { Error } from "../core/core";
import JokesUtils from "../utils/utils";
import Config from "./config/config";
import BoxCollectionView from "./list-view/box-collection-view";
import InlineView from "./list-view/inline-view";
import DetailModal from "./list-view/detail-modal";
import UpdateModal from "./detail-view/update-modal";
import CreateModal from "./list-view/create-modal";
import DeleteModal from "./list-view/delete-modal";
import LsiData from "./list-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListView",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
  isHome: false,
  contextType: "basic",
  showCopyComponent: true,
};

export const ListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    baseUri: PropTypes.string,
    rowCount: PropTypes.number,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
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

    // HINT: We can't directly store dataObject to detailData, updateData or deleteData.
    // And the reason? The operation is triggered through dataList from the modal window.
    // The useDataList holds IMMUTABLE array of the items. Every modification of the array
    // item means REMOVAL of this item from array and CREATION of the new modified item.
    // Therefore we MUST store onle unique identificator and use it during each render
    // to find up-to-date version of the dataObject in the dataList.
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
          <Lsi lsi={LsiData.createSuccessPrefix} />
          &nbsp;
          <Link colorSchema="primary" onClick={() => setDetailData({ shown: true, id: joke.id })}>
            {joke.name}
          </Link>
          &nbsp;
          <Lsi lsi={LsiData.createSuccessSuffix} />
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
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
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

    const handleDeleteDone = () => {
      setDeleteData({ shown: false });

      if (detailData) {
        setDetailData({ shown: false });
      }
    };

    const handleDeleteCancel = () => setDeleteData({ shown: false });

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

    const handleCreateDone = (joke) => {
      setCreateData({ shown: false });
      showCreateSuccess(joke);

      try {
        // HINT: The filtering and sorting is done on the server side.
        // There is no business logic about these on the client side.
        // Therefore we need to reload data to properly show new item
        // on the right place according filters, sorters and pageInfo.
        props.jokeDataList.handlerMap.reload();
      } catch (error) {
        console.error(error);
        showError(error);
      }
    };

    const handleCreateCancel = () => {
      setCreateData({ shown: false });
    };

    const handleUpdate = useCallback(
      (jokeDataObject) => {
        setUpdateData({ shown: true, id: jokeDataObject.data.id });
      },
      [setUpdateData]
    );

    const handleUpdateDone = () => {
      setUpdateData({ shown: false });
    };

    const handleUpdateCancel = () => {
      setUpdateData({ shown: false });
    };

    const handleCopyComponent = useCallback(() => {
      const uu5String = JokesUtils.createCopyTag(Config.DefaultBrickTags.JOKE_LIST, props, ["baseUri"], DEFAULT_PROPS);

      Utils.Clipboard.write(uu5String);

      alertBusRef.current.addAlert({
        content: <Lsi lsi={LsiData.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);

    const handleCopyJoke = useCallback(
      (jokeDataObject) => {
        const uu5String = `<UuJokes.Joke.Detail baseUri="${props.baseUri}" jokeId="${jokeDataObject.data.id}" />`;
        Utils.Clipboard.write(uu5String);
        alertBusRef.current.addAlert({
          content: <Lsi lsi={LsiData.copyJokeComponentSuccess} />,
          colorSchema: "success",
        });
      },
      [props]
    );
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    // ISSUE - Uu5Elements - No alternative for UU5.Bricks.AlertBus
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd5b1572961002969f271

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {/* The BoxCollectionView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "boxCollection" && (
          <BoxCollectionView
            {...props}
            header={LsiData.header}
            help={LsiData.help}
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
        {/* The InlineView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "inline" && (
          <InlineView
            {...props}
            header={LsiData.header}
            help={LsiData.help}
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
            showCopyComponent={props.showCopyComponent}
          />
        )}
        {createData.shown && (
          <CreateModal
            jokeDataList={props.jokeDataList}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            shown={true}
            onSaveDone={handleCreateDone}
            onCancel={handleCreateCancel}
          />
        )}
        {detailData.shown && activeDataObject && (
          <DetailModal
            header={LsiData.detailHeader}
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
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
          />
        )}
        {/* HINT: We need to check activeDataObject only for DeleteModal because deleteData.shown is true 
            for brief moment after dataObject removal from dataList (2 separated state values) */}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            jokeDataObject={activeDataObject}
            shown={true}
            onDeleteDone={handleDeleteDone}
            onCancel={handleDeleteCancel}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getJokeDataObject(jokeDataList, id) {
  // HINT: We need to also check newData where are newly created items
  // that don't meet filtering, sorting or paging criteria.
  const item =
    jokeDataList.newData?.find((item) => item?.data.id === id) ||
    jokeDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default ListView;
