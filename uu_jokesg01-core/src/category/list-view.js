//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useState, useRef, useCallback } from "uu5g05";
import Config from "./config/config";
import BoxCollectionView from "./list-view/box-collection-view";
import UpdateModal from "./list-view/update-modal";
import CreateModal from "./list-view/create-modal";
import DeleteModal from "./list-view/delete-modal";
import { Error } from "../core/core";
import LsiData from "./list-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ListView",
  nestingLevel: ["boxCollection", "inline"],
  //@@viewOff:statics
};

export const ListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    categoryDataList: PropTypes.object.isRequired,
    rowCount: PropTypes.number,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
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
    const [createData, setCreateData] = useState({ shown: false });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });
    const [disabled, setDisabled] = useState(false);

    // HINT: We can't directly store dataObject to detailData, updateData or deleteData.
    // And the reason? The operation is triggered through dataList from the modal window.
    // The useDataList holds IMMUTABLE array of the items. Every modification of the array
    // item means REMOVAL of this item from array and CREATION of the new modified item.
    // Therefore we MUST store onle unique identificator and use it during each render
    // to find up-to-date version of the dataObject in the dataList.
    const activeDataObjectId = updateData.id || deleteData.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getCategoryDataObject(props.categoryDataList, activeDataObjectId);
    }

    function showError(error) {
      alertBusRef.current.addAlert({
        content: <Error errorData={error} />,
        colorSchema: "danger",
      });
    }

    function showCreateSuccess(category) {
      const content = <UU5.Bricks.Lsi lsi={LsiData.createSuccess} params={[category.name]} />;
      alertBusRef.current.addAlert({
        content,
        colorSchema: "success",
        closeTimer: 5000,
      });
    }

    const handleLoad = useCallback(
      async (criteria) => {
        try {
          await props.categoryDataList.handlerMap.load(criteria);
        } catch {
          showError(LsiData.loadFailed);
        }
      },
      [props.categoryDataList]
    );

    const handleReload = useCallback(async () => {
      try {
        setDisabled(true);
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
        await Promise.all([props.jokesDataObject.handlerMap.load(), props.categoryDataList.handlerMap.reload()]);
      } catch (error) {
        console.error(error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }, [props.categoryDataList, props.jokesDataObject]);

    const handleDelete = useCallback(
      (category) => {
        setDeleteData({ shown: true, id: category.data.id });
      },
      [setDeleteData]
    );

    const handleDeleteDone = () => {
      setDeleteData({ shown: false });
    };

    const handleDeleteCancel = () => setDeleteData({ shown: false });

    const handleCreate = useCallback(() => {
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleCreateDone = (category) => {
      setCreateData({ shown: false });
      showCreateSuccess(category);

      try {
        // HINT: The filtering and sorting is done on the server side.
        // There is no business logic about these on the client side.
        // Therefore we need to reload data to properly show new item
        // on the right place according filters, sorters and pageInfo.
        props.categoryDataList.handlerMap.reload();
      } catch (error) {
        showError(console.error());
      }
    };

    const handleCreateCancel = () => setCreateData({ shown: false });

    const handleUpdate = useCallback(
      (categoryDataObject) => {
        setUpdateData({ shown: true, id: categoryDataObject.data.id });
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
      const uu5String = props.onCopyComponent();
      Utils.Clipboard.write(uu5String);
      alertBusRef.current.addAlert({
        content: <Lsi lsi={LsiData.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);
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
            disabled={disabled || props.disabled}
            onLoad={handleLoad}
            onReload={handleReload}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCopyComponent={handleCopyComponent}
          />
        )}
        {currentNestingLevel === "inline" && <UU5.Bricks.Lsi lsi={LsiData.inline} />}
        {createData.shown && (
          <CreateModal
            categoryDataList={props.categoryDataList}
            baseUri={props.baseUri}
            shown={createData.shown}
            onSaveDone={handleCreateDone}
            onCancel={handleCreateCancel}
          />
        )}
        {updateData.shown && (
          <UpdateModal
            categoryDataObject={getCategoryDataObject(props.categoryDataList, updateData.id)}
            baseUri={props.baseUri}
            shown={updateData.shown}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
          />
        )}
        {/* HINT: We need to check activeDataObject only for DeleteModal because deleteData.shown is true 
            for brief moment after dataObject removal from dataList (2 separated state values) */}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            categoryDataObject={getCategoryDataObject(props.categoryDataList, deleteData.id)}
            shown={deleteData.shown}
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
function getCategoryDataObject(categoryDataList, id) {
  // HINT: We need to also check newData where are newly created items
  // that don't meet filtering, sorting or paging criteria.
  const item =
    categoryDataList.newData?.find((item) => item?.data.id === id) ||
    categoryDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default ListView;
