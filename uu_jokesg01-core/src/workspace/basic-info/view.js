//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import { useModal } from "uu5g05-elements";
import { Utils as PlusUtils, useAwscData } from "uu_plus4u5g02";
import { ContentContainer } from "uu_plus4u5g02-elements";
import usePermission from "../use-permission.js";
import useWorkspace from "../use-workspace.js";
import useInfo from "../../common/use-info.js";
import Content from "./content.js";
import ArtifactLink from "../artifact-link.js";
import DocumentTitle from "../../common/document-title.js";
import UpdateModal from "./update-modal.js";
import RestrictDialog from "./restrict-dialog.js";
import Workspace from "../../utils/workspace.js";
import Route from "../../utils/route.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const BRICK_TAG = "UuJokesBricks.Workspace.BasicInfo";
//@@viewOff:constants

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
    icon: "uugds-info",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { workspaceDto, baseUri } = useWorkspace();
    const { data: territoryData } = useAwscData();
    const permission = usePermission();
    const viewLsi = useLsi(importLsi, [View.uu5Tag]);
    const [updateModal, openUpdateModal, closeUpdateModal] = useModal();
    const [restrictDialog, openRestrictDialog, closeRestrictDialog] = useModal();
    const info = useInfo(viewLsi.info, BRICK_TAG);

    const isDataLoaded = workspaceDto.data !== null;

    function handleGetCopyOptions() {
      return { uu5Tag: BRICK_TAG, props: { baseUri } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, Route.CONTROL_PANEL);
    }

    async function handleUpdate(event) {
      const value = event.data.value;
      const prevValue = event.data.prevValue;
      let result = { uuAppErrorMap: {} };

      if (value.name !== prevValue.name) {
        result = await workspaceDto.handlerMap.update({ name: event.data.value.name });
      }

      if (value.responsibleRoleId !== prevValue.responsibleRoleId) {
        result = await workspaceDto.handlerMap.setResponsibleRole(
          event.data.context.territoryBaseUri,
          event.data.context.artifactId,
          value.responsibleRoleId,
        );
      }

      return result;
    }

    const { containerProps, componentProps } = ContentContainer.splitProps(props, {
      title: viewLsi.title,
      subtitle: {
        inline: workspaceDto.data?.name,
        box: workspaceDto.data ? <ArtifactLink /> : undefined,
      },
      info,
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });

    function getActionList({ nestingLevel }) {
      const actionList = [];

      if (!isDataLoaded) {
        return actionList;
      }

      if (permission.workspace.canUpdate()) {
        actionList.push({
          icon: "uugds-pencil",
          children: viewLsi.update,
          collapsed: nestingLevel === "box" ? true : "auto",
          primary: true,
          significance: "common",
          onClick: () =>
            openUpdateModal({
              workspace: workspaceDto.data,
              territoryData,
              onSubmit: handleUpdate,
              onSubmitted: closeUpdateModal,
              onCancel: closeUpdateModal,
            }),
        });
      }

      if (permission.workspace.canSetState()) {
        switch (workspaceDto.data.state) {
          case Workspace.State.ACTIVE:
            actionList.push({
              icon: "uugds-lock-closed",
              children: viewLsi.restrict,
              collapsed: true,
              onClick: () =>
                openRestrictDialog({
                  workspace: workspaceDto.data,
                  onSubmit: (event) => workspaceDto.handlerMap.setState(Workspace.State.UNDER_CONSTRUCTION),
                  onSubmitted: closeRestrictDialog,
                  onCancel: closeRestrictDialog,
                }),
            });
            break;
          case Workspace.State.UNDER_CONSTRUCTION:
            actionList.push({
              icon: "uugds-lock-open",
              children: viewLsi.activate,
              collapsed: true,
              onClick: () => workspaceDto.handlerMap.setState(Workspace.State.ACTIVE),
            });
            break;
          default:
            break;
        }
      }

      return actionList;
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <DocumentTitle
          title={containerProps.title}
          subtitle={containerProps.subtitle}
          nestingLevel={containerProps.nestingLevel}
          nestingLevelList={Content.nestingLevel}
        />
        <ContentContainer
          {...containerProps}
          nestingLevelList={Content.nestingLevel}
          getActionList={getActionList}
          lsiError={{ import: importLsi, path: ["Errors"] }}
          dataMap={{
            workspace: { dataObject: workspaceDto },
          }}
        >
          <Content {...componentProps} workspace={workspaceDto.data} />
        </ContentContainer>
        {updateModal.open && <UpdateModal {...updateModal} />}
        {restrictDialog.open && <RestrictDialog {...restrictDialog} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
