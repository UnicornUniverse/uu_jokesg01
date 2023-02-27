//@@viewOn:imports
import { createVisualComponent, Utils, useState, useCallback, useLsi } from "uu5g05";
import { Link, useAlertBus } from "uu5g05-elements";
import { FilterButton, SorterButton } from "uu5tilesg02-controls";
import { getErrorLsi } from "../errors/errors";
import Config from "./config/config";
import AreaView from "./list-view/area-view";
import InlineView from "./list-view/inline-view";
import DetailModal from "./list-view/detail-modal";
import ItemDetailModal from "./detail-view/detail-modal";
import UpdateModal from "./detail-view/update-modal";
import CreateModal from "./list-view/create-modal";
import DeleteModal from "./list-view/delete-modal";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  ...Config.Types.Area.defaultProps,
  ...Config.Types.Inline.defaultProps,
  ...Config.Types.IdentificationData.defaultProps,
  ...Config.Types.List.Properties.defaultProps,
  ...Config.Types.List.AsyncData.defaultProps,
};

const ListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Area.propTypes,
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
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    const { addAlert } = useAlertBus();
    const [createData, setCreateData] = useState({ shown: false });
    const [detailData, setDetailData] = useState({ shown: false });
    const [itemDetailData, setItemDetailData] = useState({ shown: false, id: undefined });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });
    const [disabled, setDisabled] = useState(false);

    // HINT: We can't directly store dataObject to detailData, updateData or deleteData.
    // And the reason? The operation is triggered through dataList from the modal window.
    // The useDataList holds IMMUTABLE array of the items. Every modification of the array
    // item means REMOVAL of this item from array and CREATION of the new modified item.
    // Therefore we MUST store onle unique identificator and use it during each render
    // to find up-to-date version of the dataObject in the dataList.
    const activeDataObjectId = itemDetailData.id || updateData.id || deleteData.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getJokeDataObject(props.jokeDataList, activeDataObjectId);
    }

    const showError = useCallback(
      (error) =>
        addAlert({
          message: getErrorLsi(error, errorsLsi),
          priority: "error",
        }),
      [addAlert, errorsLsi]
    );

    function showCreateSuccess(joke) {
      const message = (
        <>
          {lsi.createSuccessPrefix}
          &nbsp;
          <Link colorSchema="primary" onClick={() => setItemDetailData({ shown: true, id: joke.id })}>
            {joke.name}
          </Link>
          &nbsp;
          {lsi.createSuccessSuffix}
        </>
      );

      addAlert({ message, priority: "success", durationMs: 5000 });
    }

    const handleLoad = useCallback(
      async (event) => {
        try {
          await props.jokeDataList.handlerMap.load(event?.data);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList, showError]
    );

    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.jokeDataList.handlerMap.loadNext(pageInfo);
        } catch (error) {
          showError(error);
        }
      },
      [props.jokeDataList, showError]
    );

    const handleReload = useCallback(async () => {
      try {
        setDisabled(true);
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
        await Promise.all(
          [props.jokesDataObject.handlerMap.load(), props.jokeDataList.handlerMap.reload()],
          props.categoryDataList.handlerMap.load()
        );
      } catch (error) {
        ListView.logger.error("Reload failed", error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }, [props.jokesDataObject, props.jokeDataList, props.categoryDataList, showError]);

    const handleDetailOpen = useCallback(() => setDetailData({ shown: true }), [setDetailData]);

    const handleDetailClose = useCallback(() => {
      setDetailData({ shown: false });
    }, [setDetailData]);

    const handleItemDetailOpen = useCallback(
      (jokeDataObject) => setItemDetailData({ shown: true, id: jokeDataObject.data.id }),
      [setItemDetailData]
    );

    const handleItemDetailClose = useCallback(() => {
      setItemDetailData({ shown: false });
    }, [setItemDetailData]);

    const handleDelete = useCallback(
      (jokeDataObject) => setDeleteData({ shown: true, id: jokeDataObject.data.id }),
      [setDeleteData]
    );

    const handleDeleteDone = () => {
      setDeleteData({ shown: false });

      if (itemDetailData) {
        setItemDetailData({ shown: false });
      }
    };

    const handleDeleteCancel = () => setDeleteData({ shown: false });

    const handleAddRating = useCallback(
      async (rating, jokeDataObject) => {
        try {
          await jokeDataObject.handlerMap.addRating(jokeDataObject.data, rating);
        } catch (error) {
          ListView.logger.error("Add rating failed", error);
          showError(error);
        }
      },
      [showError]
    );

    const handleUpdateVisibility = useCallback(
      async (visibility, jokeDataObject) => {
        try {
          await jokeDataObject.handlerMap.updateVisibility(jokeDataObject.data, visibility);
        } catch (error) {
          showError(error);
        }
      },
      [showError]
    );

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
        ListView.logger.error("Error creating joke", error);
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
      const uu5String = onCopyComponent();
      Utils.Clipboard.write(uu5String);
      addAlert({ message: lsi.copyComponentSuccess, priority: "success", durationMs: 2000 });
    }, [lsi, addAlert]);

    const handleCopyJoke = useCallback(
      (jokeDataObject) => {
        const uu5String = `
        <UuJokes.Joke.Detail 
          baseUri="${props.baseUri}" 
          oid="${jokeDataObject.data.id}" 
          uu5Id="${Utils.String.generateId()}" 
        />`;

        Utils.Clipboard.write(uu5String);
        addAlert({ message: lsi.copyJokeComponentSuccess, priority: "success" });
      },
      [lsi, props.baseUri, addAlert]
    );

    const handleGetItemActions = useCallback(
      (jokeDataObject) => {
        return getItemActions(props.jokesPermission, lsi, jokeDataObject, {
          handleUpdate,
          handleUpdateVisibility,
          handleDelete,
          handleCopyJoke,
        });
      },
      [props.jokesPermission, lsi, handleUpdate, handleUpdateVisibility, handleDelete, handleCopyJoke]
    );
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props);
    const { onCopyComponent, ...propsToPass } = componentProps;

    const actionList = getActions(props, lsi, { handleCreate, handleReload, handleCopyComponent });
    const filterDefinitionList = getFilters(props.jokesDataObject, props.categoryDataList, props.jokesPermission, lsi);
    const sorterDefinitionList = getSorters(lsi);

    const viewProps = {
      ...propsToPass,
      header: lsi.header,
      info: lsi.info,
      actionList,
      filterDefinitionList,
      sorterDefinitionList,
      disabled: disabled || props.disabled,
      onLoad: handleLoad,
      onLoadNext: handleLoadNext,
      onDetail: handleDetailOpen,
      onItemDetail: handleItemDetailOpen,
      onAddRating: handleAddRating,
      onGetItemActions: handleGetItemActions,
    };

    return (
      <>
        {/* The AreaView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "area" && <AreaView {...elementProps} {...viewProps} />}
        {/* The InlineView is using memo to optimize performance and ALL passed handlers MUST be wrapped by useCallback */}
        {currentNestingLevel === "inline" && <InlineView {...elementProps} {...viewProps} />}
        {createData.shown && (
          <CreateModal
            jokeDataList={props.jokeDataList}
            baseUri={props.baseUri}
            shown={true}
            onSaveDone={handleCreateDone}
            onCancel={handleCreateCancel}
          />
        )}
        {detailData.shown && <DetailModal {...viewProps} onClose={handleDetailClose} shown />}
        {itemDetailData.shown && activeDataObject && (
          <ItemDetailModal
            baseUri={props.baseUri}
            header={lsi.detailHeader}
            actionList={handleGetItemActions(activeDataObject)}
            jokesDataObject={props.jokesDataObject}
            jokeDataObject={activeDataObject}
            jokesPermission={props.jokesPermission}
            awscDataObject={props.awscDataObject}
            onClose={handleItemDetailClose}
            onAddRating={handleAddRating}
            identificationType="none"
            shown
          />
        )}
        {updateData.shown && (
          <UpdateModal
            jokeDataObject={activeDataObject}
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

function getActions(props, lsi, { handleCreate, handleReload, handleCopyComponent }) {
  const actionList = [];

  if (props.jokeDataList.data) {
    actionList.push({
      component: FilterButton,
    });

    actionList.push({
      component: SorterButton,
    });
  }

  if (props.jokesPermission.joke.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      collapsedChildren: lsi.createJoke,
      onClick: handleCreate,
      disabled: props.disabled,
      tooltip: lsi.createJoke,
    });
  }

  actionList.push({
    icon: "mdi-sync",
    children: lsi.reloadData,
    onClick: handleReload,
    collapsed: true,
    disabled: props.disabled,
  });

  actionList.push({
    icon: "mdi-content-copy",
    children: lsi.copyComponent,
    onClick: handleCopyComponent,
    collapsed: true,
  });

  return actionList;
}

function getItemActions(
  jokesPermission,
  lsi,
  jokeDataObject,
  { handleUpdate, handleUpdateVisibility, handleDelete, handleCopyJoke }
) {
  const actionList = [];
  const canManage = jokesPermission.joke.canManage(jokeDataObject.data);
  const canUpdateVisibility = jokesPermission.joke.canUpdateVisibility();

  actionList.push({
    icon: "mdi-content-copy",
    children: lsi.copyJoke,
    onClick: (event) => {
      event.stopPropagation();
      handleCopyJoke(jokeDataObject);
    },
    collapsed: true,
  });

  if (canManage) {
    actionList.push({
      icon: "mdi-pencil",
      collapsedChildren: lsi.update,
      tooltip: lsi.update,
      onClick: (event) => {
        event.stopPropagation();
        handleUpdate(jokeDataObject);
      },
    });

    actionList.push({
      icon: "mdi-delete",
      children: lsi.delete,
      onClick: (event) => {
        event.stopPropagation();
        handleDelete(jokeDataObject);
      },
      collapsed: true,
    });
  }

  if (canUpdateVisibility) {
    const lsiCode = jokeDataObject.data.visibility ? "hide" : "show";
    actionList.push({
      icon: jokeDataObject.data.visibility ? "mdi-eye-off" : "mdi-eye",
      collapsedChildren: lsi[lsiCode],
      tooltip: lsi[lsiCode],
      onClick: (event) => {
        event.stopPropagation();
        handleUpdateVisibility(!jokeDataObject.data.visibility, jokeDataObject);
      },
    });
  }

  return actionList;
}

function getFilters(jokesDataObject, categoryDataList, jokesPermission, lsi) {
  if (["pendingNoData", "errorNoData", "readyNoData"].includes(jokesDataObject.state)) {
    return [];
  }

  let filterList = [];

  if (categoryDataList.state === "ready") {
    filterList.push({
      key: "categoryIdList",
      label: lsi.category,
      inputType: "select",
      inputProps: {
        multiple: true,
        itemList: categoryDataList.data.map((categoryDto) => ({
          value: categoryDto.data.id,
          children: categoryDto.data.name,
        })),
      },
    });
  }

  if (jokesPermission.joke.canFilterVisibility()) {
    filterList.push({
      key: "visibility",
      label: lsi.visibility,
      inputType: "select",
      inputProps: {
        itemList: [
          { value: "true", children: lsi.published },
          { value: "false", children: lsi.unpublished },
        ],
      },
    });
  }

  return filterList;
}

function getSorters(lsi) {
  return [
    {
      key: "createTs",
      label: lsi.createTs,
    },
    {
      key: "name",
      label: lsi.name,
    },
    {
      key: "averageRating",
      label: lsi.rating,
    },
  ];
}
//@@viewOff:helpers

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
