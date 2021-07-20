//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import CategoryListBoxCollection from ".category-list-box-collection";
import CategoryUpdateModal from "./category-update-modal";
import CategoryCreateModal from "./category-create-modal";
import CategoryDeleteModal from "./category-delete-modal";
import Lsi from "./category-list-view-lsi";
import JokeCreateModal from "../joke/joke-list-view/joke-create-modal";
import JokeUpdateModal from "../joke/joke-detail-view/joke-update-modal";
import JokeDeleteModal from "../joke/joke-list-view/joke-delete-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryListView",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const CategoryListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryDataList: UU5.PropTypes.object.isRequired,
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
    categoryDataList: undefined,
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
    const [update, setUpdate] = useState({ shown: false, id: undefined });
    const [remove, setRemove] = useState({ shown: false, id: undefined });

    function showError(lsi, params) {
      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
        colorSchema: "red",
      });
    }

    function showCreateSuccess(category) {
      const content = (
        <>
          <UU5.Bricks.Lsi lsi={Lsi.createSuccess} params={[category.name]} />

          <UU5.Bricks.Icon icon="mdi-magnify" />
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
        await props.categoryDataList.handlerMap.reload();
      } catch {
        showError(Lsi.loadFailed);
      }
    }, [props.categoryDataList]);

    const handleDelete = useCallback((category) => setRemove({ shown: true, id: category.id }), [setRemove]);

    const handleConfirmDelete = useCallback(
      async (category) => {
        setRemove({ shown: false });

        try {
          await props.categoryDataList.handlerMap.delete(category);
        } catch {
          showError(Lsi.deleteFailed, [category.name]);
        }
      },
      [props.categoryDataList]
    );

    const handleCancelDelete = useCallback(() => setRemove({ shown: false }), [setRemove]);

    const handleCreate = useCallback(() => {
      setCreate({ shown: true });
    }, [setCreate]);

    const handleConfirmCreate = useCallback(
      async (values) => {
        try {
          const category = await props.categoryDataList.handlerMap.create(values);
          setCreate({ shown: false });
          showCreateSuccess(category);
          await props.categoryDataList.handlerMap.reload();
        } catch {
          showError(Lsi.createFailed);
        }
      },
      [props.categoryDataList, setCreate]
    );

    const handleCancelCreate = useCallback(() => {
      setCreate({ shown: false });
    }, [setCreate]);

    const handleUpdate = useCallback(
      (category) => {
        setUpdate({ shown: true, id: category.id });
      },
      [setUpdate]
    );

    const handleConfirmUpdate = useCallback(
      async (category, values) => {
        try {
          await props.jokeDataList.handlerMap.update(category, values);
          setUpdate({ shown: false });
        } catch {
          showError(Lsi.updateFailed, [category.name]);
        }
      },
      [props.categoryDataList, setUpdate]
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        <CategoryListBoxCollection
          {...props}
          {...attrs}
          header={Lsi.header}
          help={Lsi.help}
          onLoad={handleLoad}
          onLoadNext={handleLoadNext}
          onReload={handleReload}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCopyComponent={handleCopyComponent}
        />
        {create.shown && (
          <CategoryCreateModal
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
            jokeDataObject={getCategoryDataItem(props.jokeDataList, remove.id)}
            shown={remove.shown}
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
function getCategoryDataItem(categoryDataList, id) {
  const item =
    categoryDataList.newData?.find((item) => item?.data.id === id) ||
    categoryDataList.data.find((item) => item?.data.id === id);

  return item;
}
//@@viewOff:helpers

export default CategoryListView;
