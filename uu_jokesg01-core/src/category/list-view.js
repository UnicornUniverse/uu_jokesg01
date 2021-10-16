//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef, useCallback } from "uu5g04-hooks";
import Config from "./config/config";
import BoxCollectionView from "./list-view/box-collection-view";
import UpdateModal from "./list-view/update-modal";
import CreateModal from "./list-view/create-modal";
import DeleteModal from "./list-view/delete-modal";
import { Error } from "../core/core";
import Lsi from "./list-view-lsi";
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
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    categoryDataList: UU5.PropTypes.object.isRequired,
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
    jokesDataObject: undefined,
    jokesPermission: undefined,
    categoryDataList: undefined,
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
    const [createData, setCreateData] = useState({ shown: false });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });
    const [disabled, setDisabled] = useState(false);

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
      const content = (
        <>
          <UU5.Bricks.Lsi lsi={Lsi.createSuccess} params={[category.name]} />
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
          await props.categoryDataList.handlerMap.load(criteria);
        } catch {
          showError(Lsi.loadFailed);
        }
      },
      [props.categoryDataList]
    );

    const handleReload = useCallback(async () => {
      try {
        setDisabled(true);
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

    const handleConfirmDelete = () => {
      setDeleteData({ shown: false });
    };

    const handleCancelDelete = useCallback(() => setDeleteData({ shown: false }), [setDeleteData]);

    const handleCreate = useCallback(() => {
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleConfirmCreate = (category) => {
      setCreateData({ shown: false });
      showCreateSuccess(category);

      try {
        props.categoryDataList.handlerMap.reload();
      } catch (error) {
        showError(console.error());
      }
    };

    const handleCancelCreate = useCallback(() => {
      setCreateData({ shown: false });
    }, [setCreateData]);

    const handleUpdate = useCallback(
      (categoryDataObject) => {
        setUpdateData({ shown: true, id: categoryDataObject.data.id });
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
      const uu5String = props.onCopyComponent();
      UU5.Utils.Clipboard.write(uu5String);
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }, [props]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

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
            disabled={disabled || props.disabled}
            onLoad={handleLoad}
            onReload={handleReload}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCopyComponent={handleCopyComponent}
          />
        )}
        {currentNestingLevel === "inline" && <UU5.Bricks.Lsi lsi={Lsi.inline} />}
        {createData.shown && (
          <CreateModal
            categoryDataList={props.categoryDataList}
            baseUri={props.baseUri}
            shown={createData.shown}
            onSave={handleConfirmCreate}
            onCancel={handleCancelCreate}
          />
        )}
        {updateData.shown && (
          <UpdateModal
            categoryDataObject={getCategoryDataObject(props.categoryDataList, updateData.id)}
            baseUri={props.baseUri}
            shown={updateData.shown}
            onSave={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            categoryDataObject={getCategoryDataObject(props.categoryDataList, deleteData.id)}
            shown={deleteData.shown}
            onCancel={handleCancelDelete}
            onDelete={handleConfirmDelete}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getCategoryDataObject(categoryDataList, id) {
  const item =
    categoryDataList.newData?.find((item) => item?.data.id === id) ||
    categoryDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default ListView;
