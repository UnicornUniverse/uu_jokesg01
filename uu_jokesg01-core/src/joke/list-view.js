//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, useRef, useState, useCallback, Lsi } from "uu5g05";
import { Link } from "uu5g05-elements";
import { Error } from "../core/core";
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
  uu5Tag: Config.TAG + "ListView",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  ...Config.Types.Box.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.IdentificationData.defaultProps,
  ...Config.Types.List.Properties.defaultProps,
  ...Config.Types.List.AsyncData.defaultProps,
};

export const ListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Box.propTypes,
    ...Config.Types.Inline.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.List.Properties.propTypes,
    ...Config.Types.List.AsyncData.propTypes,
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

    const handleDelete = useCallback(
      (jokeDataObject) => setDeleteData({ shown: true, id: jokeDataObject.data.id }),
      [setDeleteData]
    );

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

    const handleCopyComponent = () => {
      const uu5String = props.onCopyComponent();
      Utils.Clipboard.write(uu5String);

      alertBusRef.current.addAlert({
        content: <Lsi lsi={LsiData.copyComponentSuccess} />,
        colorSchema: "success",
      });
    };

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
    const actionList = getActions(props, { handleCreate, handleReload, handleCopyComponent });

    const viewProps = {
      ...props,
      header: LsiData.header,
      info: LsiData.info,
      actionList,
      disabled: disabled || props.disabled,
      onLoad: handleLoad,
      onLoadNext: handleLoadNext,
      onCreate: handleCreate,
      onDetail: handleOpenDetail,
      onUpdate: handleUpdate,
      onDelete: handleDelete,
      onAddRating: handleAddRating,
      onUpdateVisibility: handleUpdateVisibility,
    };

    // ISSUE - Uu5Elements - No alternative for UU5.Bricks.AlertBus
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd5b1572961002969f271

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {/* The BoxCollectionView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "boxCollection" && <BoxCollectionView {...viewProps} />}
        {/* The InlineView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "inline" && <InlineView {...viewProps} />}
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
            actionList={getItemActions(props, activeDataObject, {
              handleUpdate,
              handleUpdateVisibility,
              handleDelete,
              handleCopyJoke,
            })}
            jokeDataObject={activeDataObject}
            jokesPermission={props.jokesPermission}
            categoryList={props.jokesDataObject.data.categoryList}
            onClose={handleCloseDetail}
            onAddRating={handleAddRating}
            shown
          />
        )}
        {updateData.shown && (
          <UpdateModal
            jokeDataObject={activeDataObject}
            categoryList={props.jokesDataObject.data.categoryList}
            baseUri={props.baseUri}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
            shown
          />
        )}
        {/* HINT: We need to check activeDataObject only for DeleteModal because deleteData.shown is true 
            for brief moment after dataObject removal from dataList (2 separated state values) */}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            jokeDataObject={activeDataObject}
            onDeleteDone={handleDeleteDone}
            onCancel={handleDeleteCancel}
            shown
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

function getActions(props, { handleCreate, handleReload, handleCopyComponent }) {
  const actionList = [];

  if (props.jokesPermission.joke.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      children: <Lsi lsi={LsiData.createJoke} />,
      primary: true,
      onClick: handleCreate,
      disabled: props.disabled,
    });
  }

  actionList.push({
    icon: "mdi-sync",
    children: <Lsi lsi={LsiData.reloadData} />,
    onClick: handleReload,
    collapsed: true,
    disabled: props.disabled,
  });

  actionList.push({
    icon: "mdi-content-copy",
    children: <Lsi lsi={LsiData.copyComponent} />,
    onClick: handleCopyComponent,
    collapsed: true,
  });

  return actionList;
}

function getItemActions(props, jokeDataObject, { handleUpdate, handleUpdateVisibility, handleDelete, handleCopyJoke }) {
  const actionList = [];
  const canManage = props.jokesPermission.joke.canManage(jokeDataObject.data);
  const canUpdateVisibility = props.jokesPermission.joke.canUpdateVisibility();

  actionList.push({
    icon: "mdi-content-copy",
    children: <Lsi lsi={LsiData.copyJoke} />,
    onClick: () => handleCopyJoke(jokeDataObject),
    collapsed: true,
  });

  if (canManage) {
    actionList.push({
      icon: "mdi-pencil",
      children: <Lsi lsi={LsiData.update} />,
      onClick: () => handleUpdate(jokeDataObject),
      disabled: props.disabled,
      primary: true,
    });

    actionList.push({
      icon: "mdi-delete",
      children: <Lsi lsi={LsiData.delete} />,
      onClick: () => handleDelete(jokeDataObject),
      disabled: props.disabled,
      collapsed: true,
    });
  }

  if (canUpdateVisibility) {
    const lsiCode = jokeDataObject.data.visibility ? "hide" : "show";
    actionList.push({
      icon: jokeDataObject.data.visibility ? "mdi-eye-off" : "mdi-eye",
      children: <Lsi lsi={LsiData[lsiCode]} />,
      onClick: () => handleUpdateVisibility(!jokeDataObject.data.visibility, jokeDataObject),
      disabled: props.disabled,
      primary: true,
    });
  }

  return actionList;
}
//@@viewOff:helpers

export default ListView;
