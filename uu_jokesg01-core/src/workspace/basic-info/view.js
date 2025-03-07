//@@viewOn:imports
import { createVisualComponent, useLsi, useState, Utils } from "uu5g05";
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
    const info = useInfo(viewLsi.info, BRICK_TAG);
    const [refreshKey, setRefreshKey] = useState(() => Utils.String.generateId());

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

      if (value.name !== prevValue.name || value.desc !== prevValue.desc) {
        result = await workspaceDto.handlerMap.update({ name: value.name, desc: value.desc });
      }

      if (value.state !== prevValue.state) {
        result = await workspaceDto.handlerMap.setState(value.state);
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
          collapsed: nestingLevel === "box" ? true : "auto",
          collapsedChildren: viewLsi.update,
          onClick: () =>
            openUpdateModal({
              workspace: workspaceDto.data,
              territoryData,
              permission,
              onSubmit: handleUpdate,
              onSubmitted: closeUpdateModal,
              onCancel: closeUpdateModal,
            }),
        });
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
            workspace: {
              dataObject: workspaceDto,
              reload: (dataObject) => {
                setRefreshKey(Utils.String.generateId());
                dataObject.handlerMap.load();
              },
            },
          }}
        >
          <Content
            {...componentProps}
            workspace={workspaceDto.data}
            territoryData={territoryData}
            permission={permission}
            refreshKey={refreshKey}
          />
        </ContentContainer>
        {updateModal.open && <UpdateModal {...updateModal} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
