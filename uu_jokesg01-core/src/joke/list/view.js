//@@viewOn:imports
import { createVisualComponent, useLsi, useUpdateEffect, useRouteParams, Utils } from "uu5g05";
import { useModal } from "uu5g05-elements";
import { Utils as PlusUtils } from "uu_plus4u5g02";
import { ContentContainer, useAlertBus } from "uu_plus4u5g02-elements";
import Uu5Tiles from "uu5tilesg02";
import { FilterButton, SorterButton } from "uu5tilesg02-controls";
import { JokeContext } from "../use-joke.js";
import Content from "./content.js";
import ArtifactLink from "../../workspace/artifact-link.js";
import CreateModal from "./create-modal.js";
import DeleteDialog from "./delete-dialog.js";
import CategoryList from "../../category/list.js";
import Detail from "../detail.js";
import Counter from "./counter.js";
import useWorkspace from "../../workspace/use-workspace.js";
import useJokeList from "../use-joke-list.js";
import useInfo from "../../common/use-info.js";
import usePermission from "../../workspace/use-permission.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const BRICK_TAG = "UuJokesBricks.Joke.List";
//@@viewOff:constants

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

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  nestingLevel: ContentContainer.getComponentNestingLevel(Content.nestingLevel),
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...ContentContainer.getComponentPropTypes(Content.nestingLevel),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...ContentContainer.getComponentDefaultProps(Content.nestingLevel),
    icon: "uugds-view-grid",
  },
  //@@viewOff:defaultProps

  render({ filterDefinitionList, sorterDefinitionList, ...propsToPass }) {
    //@@viewOn:private
    const { addAlert, showError } = useAlertBus(importLsi);
    const { workspaceDto, baseUri } = useWorkspace();
    const { jokeDataList, filterList, sorterList, setFilterList, setSorterList } = useJokeList();
    const permission = usePermission();
    const [, setParams] = useRouteParams();
    const viewLsi = useLsi(importLsi, [View.uu5Tag]);
    const [createModal, openCreateModal, closeCreateModal] = useModal();
    const [detailModal, openDetailModal, closeDetailModal] = useModal();
    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal();
    const [categoryModal, openCategoryModal] = useModal();
    const info = useInfo(viewLsi.info, BRICK_TAG);

    const detailJokeDto = detailModal.open && getJokeDataObject(jokeDataList, detailModal.oid);

    const isDataLoaded = workspaceDto.data !== null && jokeDataList.data !== null;

    useUpdateEffect(
      () => setParams({ filterMap: Uu5Tiles.Utils.FilterList.toMap(filterList), sorterList }),
      [filterList, sorterList],
    );

    const handleFilterChange = async (event) => {
      setFilterList(event.data.filterList);
    };

    const handleSorterChange = async (event) => {
      setSorterList(event.data.sorterList);
    };

    const handleLoadNext = async ({ indexFrom }) => {
      try {
        await jokeDataList.handlerMap.loadNext({
          pageSize: jokeDataList.pageSize,
          pageIndex: Math.floor(indexFrom / jokeDataList.pageSize),
        });
      } catch (error) {
        showError(error);
      }
    };

    function handleGetCopyOptions() {
      return { uu5Tag: BRICK_TAG, props: { baseUri, filterList, sorterList } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, "jokes");
    }

    async function handleCreateSubmitted(event) {
      const joke = event.data.submitResult;
      jokeDataList.handlerMap.load();
      closeCreateModal();
      addAlert({
        header: viewLsi.createAlertHeader,
        message: Utils.String.format(viewLsi.createAlertMessage, { name: joke.name }),
        priority: "success",
        controlPosition: "bottom",
        controlList: [
          {
            children: viewLsi.createAlertButton,
            colorScheme: "primary",
            significance: "distinct",
            onClick: () =>
              openDetailModal({
                oid: joke.id,
                getActionList: getItemActionList,
                hideConfiguration: true,
                onClose: closeDetailModal,
              }),
          },
        ],
      });
    }

    function getActionList({ nestingLevel }) {
      const actionList = [];

      if (!isDataLoaded) {
        return actionList;
      }

      if (nestingLevel !== "box") {
        actionList.push({ component: FilterButton });
        actionList.push({ component: SorterButton });
      }

      if (permission.joke.canCreate()) {
        actionList.push({
          icon: "uugds-plus-circle",
          children: viewLsi.create,
          collapsed: nestingLevel === "box",
          primary: true,
          significance: "common",
          onClick: () =>
            openCreateModal({
              onSubmit: (event) => jokeDataList.handlerMap.create(event.data.value),
              onSubmitted: handleCreateSubmitted,
              onCancel: closeCreateModal,
            }),
        });
      }

      if (permission.category.canManage()) {
        actionList.push({
          icon: "uugds-tag",
          children: viewLsi.categories,
          collapsed: true,
          onClick: openCategoryModal,
        });
      }

      return actionList;
    }

    function getItemActionList({ actionList, jokeDto }) {
      if (permission.joke.canManage(jokeDto.data)) {
        actionList.push({
          icon: "uugds-delete",
          children: viewLsi.delete,
          collapsed: true,
          onClick: () =>
            openDeleteDialog({
              joke: jokeDto.data,
              onSubmit: () => jokeDto.handlerMap.delete(jokeDto.data),
              onSubmitted: () => {
                closeDeleteDialog();
                closeDetailModal(); // Special case when newly added joke is open to modal and immediatelly deleted
              },
              onCancel: closeDeleteDialog,
            }),
        });
      }

      return actionList;
    }

    const { containerProps } = ContentContainer.splitProps(propsToPass, {
      title: viewLsi.title,
      subtitle: {
        inline: workspaceDto.data?.name,
        box: workspaceDto.data ? <ArtifactLink /> : undefined,
      },
      info,
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <Uu5Tiles.ControllerProvider
          data={jokeDataList.data}
          filterDefinitionList={filterDefinitionList}
          sorterDefinitionList={sorterDefinitionList}
          filterList={filterList}
          sorterList={sorterList}
          onFilterChange={handleFilterChange}
          onSorterChange={handleSorterChange}
        >
          <ContentContainer
            {...containerProps}
            nestingLevelList={Content.nestingLevel}
            getActionList={getActionList}
            inlineView={{ dataToResolve: ["workspace"] }}
            areaView={{
              containerProps: {
                footer: isDataLoaded ? ({ style }) => <Counter style={style} /> : undefined,
                footerSeparator: true,
              },
            }}
            modalView={{
              containerProps: {
                footer: isDataLoaded ? ({ style }) => <Counter style={style} /> : undefined,
                footerSeparator: true,
              },
            }}
            lsiError={{ import: importLsi, path: ["Errors"] }}
            dataMap={{
              workspace: { dataObject: workspaceDto },
              jokeList: { dataObject: jokeDataList },
            }}
          >
            {({ padding, nestingLevel }) => (
              <Content
                padding={padding}
                nestingLevel={nestingLevel}
                getItemActionList={getItemActionList}
                onLoadNext={handleLoadNext}
              />
            )}
          </ContentContainer>
        </Uu5Tiles.ControllerProvider>
        {createModal.open && <CreateModal {...createModal} />}
        {deleteDialog.open && <DeleteDialog {...deleteDialog} />}
        {categoryModal.open && <CategoryList {...categoryModal} displayAsModal />}
        {detailModal.open && detailJokeDto && (
          <JokeContext.Provider value={{ jokeDto: detailJokeDto, oid: detailJokeDto.data.id, baseUri }}>
            <Detail {...detailModal} displayAsModal />
          </JokeContext.Provider>
        )}
        {
          // Special case when newly added joke doesn't meet filter criteria and is not in filtered jokeDataList
          detailModal.open && !detailJokeDto && <Detail {...detailModal} oid={detailModal.oid} displayAsModal />
        }
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
