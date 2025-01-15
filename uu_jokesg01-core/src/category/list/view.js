//@@viewOn:imports
import { createVisualComponent, useLsi, useUpdateEffect, useRouteParams, Utils } from "uu5g05";
import { Utils as PlusUtils } from "uu_plus4u5g02";
import { ContentContainer, useAlertBus } from "uu_plus4u5g02-elements";
import { ControllerProvider } from "uu5tilesg02";
import { SerieButton, SorterButton } from "uu5tilesg02-controls";
import { Box, useModal } from "uu5g05-elements";
import Content from "./content.js";
import Counter from "./counter.js";
import ArtifactLink from "../../workspace/artifact-link.js";
import useWorkspace from "../../workspace/use-workspace.js";
import usePermission from "../../workspace/use-permission.js";
import useCategoryList from "../use-category-list.js";
import CreateModal from "./create-modal.js";
import UpdateModal from "./update-modal.js";
import DeleteDialog from "./delete-dialog.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

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
    icon: "uugds-tag",
  },
  //@@viewOff:defaultProps

  render({ sorterDefinitionList, onItemClick, ...propsToPass }) {
    //@@viewOn:private
    const { showError, showSuccess } = useAlertBus(importLsi);
    const { workspaceDto, baseUri } = useWorkspace();
    const { categoryDataList, sorterList, setSorterList, serieList, setSerieList } = useCategoryList();
    const [, setParams] = useRouteParams();
    const [createModal, openCreateModal, closeCreateModal] = useModal();
    const [updateModal, openUpdateModal, closeUpdateModal] = useModal();
    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal();
    const permission = usePermission();
    const viewLsi = useLsi(importLsi, [View.uu5Tag]);

    const isDataLoaded = workspaceDto.data && categoryDataList.data;

    useUpdateEffect(() => setParams({ sorterList }), [sorterList]);

    const handleSorterChange = async (event) => {
      setSorterList(event.data.sorterList);
    };

    const handleLoad = async (event) => {
      const { sorterList } = event.data;
      setSorterList(sorterList);
    };

    const handleLoadNext = async ({ indexFrom }) => {
      try {
        await categoryDataList.handlerMap.loadNext({
          pageSize: categoryDataList.pageSize,
          pageIndex: Math.floor(indexFrom / categoryDataList.pageSize),
        });
      } catch (error) {
        showError(error);
      }
    };

    function handleGetCopyOptions() {
      return { uu5Tag: "UuJokesBricks.Category.List", props: { baseUri, sorterList, serieList } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, "categories");
    }

    async function handleCreateSubmitted(event) {
      const category = event.data.submitResult;
      closeCreateModal();
      showSuccess({
        header: viewLsi.createAlertHeader,
        message: Utils.String.format(viewLsi.createAlertMessage, { name: category.name }),
      });
    }

    function getActionList({ nestingLevel }) {
      const actionList = [];

      if (!isDataLoaded) {
        return actionList;
      }

      if (nestingLevel !== "box") {
        actionList.push({ component: SorterButton });
        actionList.push({ component: SerieButton });
      }

      if (permission.category.canCreate()) {
        actionList.push({
          icon: "uugds-plus-circle",
          children: viewLsi.create,
          onClick: () =>
            openCreateModal({
              onSubmit: (event) => categoryDataList.handlerMap.create(event.data.value),
              onSubmitted: handleCreateSubmitted,
              onCancel: closeCreateModal,
            }),
          collapsed: nestingLevel === "box",
          primary: true,
          significance: "common",
        });
      }

      return actionList;
    }

    function getItemActionList({ data: categoryDto }) {
      const actionList = [];

      if (permission.category.canManage(categoryDto.data)) {
        actionList.push({
          icon: "uugds-pencil",
          children: viewLsi.update,
          collapsed: true,
          onClick: () =>
            openUpdateModal({
              category: categoryDto.data,
              onSubmit: (event) => categoryDto.handlerMap.update(event.data.value),
              onSubmitted: closeUpdateModal,
              onCancel: closeUpdateModal,
            }),
        });

        actionList.push({
          icon: "uugds-delete",
          children: viewLsi.delete,
          onClick: () =>
            openDeleteDialog({
              onSubmit: () => categoryDto.handlerMap.delete(categoryDto.data),
              onSubmitted: closeDeleteDialog,
              onCancel: closeDeleteDialog,
            }),
          collapsed: true,
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
      info: viewLsi.info,
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });

    function Footer(props) {
      return (
        <Box {...props} significance="distinct">
          <Counter />
        </Box>
      );
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <ControllerProvider
          data={categoryDataList.data}
          serieList={serieList}
          onSerieChange={(event) => setSerieList(event.data.serieList)}
          sorterDefinitionList={sorterDefinitionList}
          sorterList={sorterList}
          onSorterChange={handleSorterChange}
        >
          <ContentContainer
            {...containerProps}
            nestingLevelList={Content.nestingLevel}
            getActionList={getActionList}
            inlineView={{ dataToResolve: ["workspace"] }}
            areaView={{
              containerProps: {
                footer: isDataLoaded ? ({ style }) => <Footer style={style} /> : undefined,
                footerSeparator: true,
              },
            }}
            modalView={{
              containerProps: {
                footer: isDataLoaded ? ({ style }) => <Footer style={style} /> : undefined,
                footerSeparator: true,
              },
            }}
            lsiError={{ import: importLsi, path: ["Errors"] }}
            dataMap={{
              workspace: { dataObject: workspaceDto },
              categoryList: { dataObject: categoryDataList },
            }}
          >
            {({ padding, nestingLevel }) => (
              <Content
                padding={padding}
                nestingLevel={nestingLevel}
                onLoad={handleLoad}
                onLoadNext={handleLoadNext}
                onItemClick={onItemClick}
                getItemActionList={getItemActionList}
              />
            )}
          </ContentContainer>
        </ControllerProvider>
        {createModal.open && <CreateModal {...createModal} />}
        {updateModal.open && <UpdateModal {...updateModal} />}
        {deleteDialog.open && <DeleteDialog {...deleteDialog} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
