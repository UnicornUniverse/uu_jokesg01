//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import { useModal } from "uu5g05-elements";
import { Utils as PlusUtils } from "uu_plus4u5g02";
import { ContentContainer } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
import useWorkspace from "../use-workspace.js";
import Content from "./content.js";
import ArtifactLink from "../artifact-link.js";
import StateModal from "./state-modal.js";
import UpdateModal from "./update-modal.js";
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
    icon: "uugds-info",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { workspaceDto, baseUri } = useWorkspace();
    const viewLsi = useLsi(importLsi, [View.uu5Tag]);
    const [stateModal, openStateModal, closeStateModal] = useModal();
    const [updateModal, openUpdateModal, closeUpdateModal] = useModal();

    function handleGetCopyOptions() {
      return { uu5Tag: "UuJokesBricks.Workspace.BasicInfo", props: { baseUri } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, "controlPanel");
    }

    const { containerProps, componentProps } = ContentContainer.splitProps(props, {
      title: viewLsi.title,
      subtitle: {
        inline: workspaceDto.data?.name,
        box: workspaceDto.data ? <ArtifactLink /> : undefined,
      },
      info: viewLsi.info,
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <ContentContainer
          {...containerProps}
          nestingLevelList={Content.nestingLevel}
          lsiError={{ import: importLsi, path: ["Errors"] }}
          dataMap={{
            workspace: { dataObject: workspaceDto },
          }}
        >
          <Content
            {...componentProps}
            workspace={workspaceDto.data}
            onStateClick={() =>
              openStateModal({
                workspace: workspaceDto.data,
                onSubmit: (event) => workspaceDto.handlerMap.setState(event.data.value),
                onSubmitted: closeStateModal,
                onCancel: closeStateModal,
              })
            }
            onNameClick={() =>
              openUpdateModal({
                workspace: workspaceDto.data,
                onSubmit: (event) => workspaceDto.handlerMap.update(event.data.value),
                onSubmitted: closeUpdateModal,
                onCancel: closeUpdateModal,
              })
            }
          />
        </ContentContainer>
        {stateModal.open && <StateModal {...stateModal} />}
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
