//@@viewOn:imports
import { createVisualComponent, useLsi, PropTypes } from "uu5g05";
import { Utils as PlusUtils } from "uu_plus4u5g02";
import { ContentContainer, useAlertBus } from "uu_plus4u5g02-elements";
import { useModal } from "uu5g05-elements";
import useWorkspace from "../../workspace/use-workspace.js";
import usePermission from "../../workspace/use-permission.js";
import usePreference from "../../preference/use-preference.js";
import useJoke from "../use-joke.js";
import Content from "./content.js";
import UpdateModal from "./update-modal.js";
import RateModal from "./rate-modal.js";
import PreferenceModal from "./preference-modal.js";
import BoxFooter from "./box-footer.js";
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
    hideInlineSummary: Content.propTypes.hideInlineSummary,
    hideConfiguration: PropTypes.bool,
    getActionList: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...ContentContainer.getComponentDefaultProps(Content.nestingLevel),
    hideInlineSummary: Content.defaultProps.hideInlineSummary,
    hideConfiguration: false,
  },
  //@@viewOff:defaultProps

  render({ hideConfiguration, hideInlineSummary, getActionList: propGetActionList, ...propsToPass }) {
    //@@viewOn:private
    const { workspaceDto, baseUri } = useWorkspace();
    const { jokeDto, oid } = useJoke();
    const { preferenceDto } = usePreference();
    const permission = usePermission();
    const viewLsi = useLsi(importLsi, [View.uu5Tag]);
    const { showError } = useAlertBus({ import: importLsi, path: ["Errors"] });
    const [updateModal, openUpdateModal, closeUpdateModal] = useModal();
    const [rateModal, openRateModal, closeRateModal] = useModal();
    const [preferenceModal, openPreferenceModal, closePreferenceModal] = useModal();

    function handleGetCopyOptions() {
      return { uu5Tag: "UuJokesBricks.Joke.Detail", props: { baseUri, oid } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, "joke", { oid });
    }

    async function handleUpdateVisibility(visibility) {
      try {
        await jokeDto.handlerMap.updateVisibility({ visibility });
      } catch (error) {
        View.logger.error("Error updating visibility", error);
        showError(error);
      }
    }

    const { containerProps } = ContentContainer.splitProps(propsToPass, {
      title: jokeDto.data?.name,
      subtitle: viewLsi.subtitle,
      info: viewLsi.info,
      icon: "uugdsstencil-edit-emoji-smile",
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });

    function getActionList(containerParams) {
      const { nestingLevel } = containerParams;
      const actionList = [];

      if (workspaceDto.data === null || jokeDto.data === null || preferenceDto.data === null) {
        return actionList;
      }

      if (permission.joke.canManage(jokeDto.data)) {
        actionList.push({
          icon: "uugds-pencil",
          children: viewLsi.update,
          collapsed: nestingLevel === "box",
          onClick: () =>
            openUpdateModal({
              joke: jokeDto.data,
              onSubmit: (event) => jokeDto.handlerMap.update(event.data.value),
              onSubmitted: closeUpdateModal,
              onCancel: closeUpdateModal,
            }),
        });
      }

      if (permission.joke.canAddRating(jokeDto.data)) {
        actionList.push({
          icon: "uugds-favorites",
          children: viewLsi.rate,
          onClick: () =>
            openRateModal({
              onSubmit: (event) => jokeDto.handlerMap.addRating({ rating: event.data.value }),
              onSubmitted: closeRateModal,
              onCancel: closeRateModal,
            }),
          collapsed: nestingLevel === "box",
        });
      }

      if (permission.joke.canUpdateVisibility(jokeDto.data)) {
        const lsiCode = jokeDto.data.visibility ? "hide" : "show";
        actionList.push({
          icon: jokeDto.data.visibility ? "mdi-eye-off" : "mdi-eye",
          children: viewLsi[lsiCode],
          onClick: () => handleUpdateVisibility(!jokeDto.data.visibility),
          collapsed: nestingLevel === "box",
        });
      }

      if (!hideConfiguration) {
        actionList.push({
          icon: "uugds-settings",
          children: viewLsi.configure,
          onClick: () =>
            openPreferenceModal({
              preference: preferenceDto.data,
              onSubmit: (event) => preferenceDto.handlerMap.update(event.data.value),
              onSubmitted: closePreferenceModal,
              onCancel: closePreferenceModal,
            }),
          collapsed: true,
        });
      }

      if (propGetActionList) {
        return propGetActionList({ containerParams, jokeDto, actionList });
      } else {
        return actionList;
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <ContentContainer
          {...containerProps}
          nestingLevelList={Content.nestingLevel}
          getActionList={getActionList}
          lsiError={{ import: importLsi, path: ["Errors"] }}
          inlineView={{ dataToResolve: ["workspace", "joke"] }}
          boxView={{
            containerProps: {
              footer: ({ style }) => <BoxFooter joke={jokeDto.data} style={style} />,
              footerSeparator: true,
            },
          }}
          dataMap={{
            workspace: { dataObject: workspaceDto },
            preference: { dataObject: preferenceDto },
            joke: { dataObject: jokeDto },
          }}
        >
          {({ nestingLevel, padding }) => (
            <Content
              joke={jokeDto.data}
              nestingLevel={nestingLevel}
              padding={padding}
              showAuthor={preferenceDto.data?.showAuthor}
              showCategories={preferenceDto.data?.showCategories}
              showCreationTime={preferenceDto.data?.showCreationTime}
              hideInlineSummary={hideInlineSummary}
            />
          )}
        </ContentContainer>
        {updateModal.open && <UpdateModal {...updateModal} />}
        {rateModal.open && <RateModal {...rateModal} />}
        {preferenceModal.open && <PreferenceModal {...preferenceModal} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
