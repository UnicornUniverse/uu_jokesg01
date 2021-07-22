//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef, useCallback } from "uu5g04-hooks";
import Config from "./config/config";
import CategoryListBoxCollection from "./category-list-box-collection";
import CategoryUpdateModal from "./category-update-modal";
import CategoryCreateModal from "./category-create-modal";
import CategoryDeleteModal from "./category-delete-modal";
import Lsi from "./category-list-view-lsi";
import { Error } from "../core/core";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryListView",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const CategoryListView = createVisualComponent({
  ...STATICS,

  // TODO LACO Rename prop dataObject
  //@@viewOn:propTypes
  propTypes: {
    categoryDataList: UU5.PropTypes.object.isRequired,
    dataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
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
    categoryDataList: undefined,
    datObject: undefined,
    jokesPermission: undefined,
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
    const [update, setUpdate] = useState({ shown: false, id: undefined });
    const [remove, setRemove] = useState({ shown: false, id: undefined });

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
        await props.categoryDataList.handlerMap.reload();
      } catch {
        showError(Lsi.loadFailed);
      }
    }, [props.categoryDataList]);

    const handleDelete = useCallback(
      (category) => {
        setRemove({ shown: true, id: category.data.id });
      },
      [setRemove]
    );

    const handleConfirmDelete = () => {
      setRemove({ shown: false });
    };

    const handleCancelDelete = useCallback(() => setRemove({ shown: false }), [setRemove]);

    const handleCreate = useCallback(() => {
      setCreate({ shown: true });
    }, [setCreate]);

    const handleConfirmCreate = (category) => {
      setCreate({ shown: false });
      showCreateSuccess(category);

      try {
        props.jokeDataList.handlerMap.reload();
      } catch (error) {
        showError(console.error());
      }
    };

    const handleCancelCreate = useCallback(() => {
      setCreate({ shown: false });
    }, [setCreate]);

    const handleUpdate = useCallback(
      (categoryDataObject) => {
        setUpdate({ shown: true, id: categoryDataObject.data.id });
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    // TODO LACO Refactor work with active dataObject according JokeListView
    // TODO LACO For inline the LSI component with message should be shown according design
    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "boxCollection" && (
          <CategoryListBoxCollection
            {...props}
            {...attrs}
            header={Lsi.header}
            help={Lsi.help}
            onLoad={handleLoad}
            onReload={handleReload}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onCopyComponent={handleCopyComponent}
          />
        )}
        {currentNestingLevel === "inline" && showError(Lsi.inline)}
        {create.shown && (
          <CategoryCreateModal
            categoryDataList={props.categoryDataList}
            baseUri={props.baseUri}
            shown={create.shown}
            onSave={handleConfirmCreate}
            onCancel={handleCancelCreate}
          />
        )}
        {update.shown && (
          <CategoryUpdateModal
            categoryDataObject={getCategoryDataItem(props.categoryDataList, update.id)}
            baseUri={props.baseUri}
            shown={update.shown}
            onSave={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          />
        )}
        {remove.shown && (
          <CategoryDeleteModal
            categoryDataObject={getCategoryDataItem(props.categoryDataList, remove.id)}
            shown={remove.shown}
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
function getCategoryDataItem(categoryDataList, id) {
  const item =
    categoryDataList.newData?.find((item) => item?.data.id === id) ||
    categoryDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default CategoryListView;
