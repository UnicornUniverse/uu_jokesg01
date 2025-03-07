//@@viewOn:imports
import { createVisualComponent, useLsi, PropTypes } from "uu5g05";
import { Utils as PlusUtils } from "uu_plus4u5g02";
import { ContentContainer, useAlertBus } from "uu_plus4u5g02-elements";
import { useModal } from "uu5g05-elements";
import useWorkspace from "../../workspace/use-workspace.js";
import usePermission from "../../workspace/use-permission.js";
import usePreference from "../../preference/use-preference.js";
import useJoke from "../use-joke.js";
import useInfo from "../../common/use-info.js";
import DocumentTitle from "../../common/document-title.js";
import Content from "./content.js";
import UpdateModal from "./update-modal.js";
import RateModal from "./rate-modal.js";
import PreferenceModal from "./preference-modal.js";
import DeleteDialog from "./delete-dialog.js";
import BoxFooter from "./box-footer.js";
import Route from "../../utils/route.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const BRICK_TAG = "UuJokesBricks.Joke.Detail";
//@@viewOff:constants

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  nestingLevel: ContentContainer.getComponentNestingLevel(Content.nestingLevel),
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...ContentContainer.getComponentPropTypes(Content.nestingLevel),
    showInlineSummary: Content.propTypes.showInlineSummary,
    hideConfiguration: PropTypes.bool,
    onDeleteDone: PropTypes.func,
    displayActionList: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...ContentContainer.getComponentDefaultProps(Content.nestingLevel),
    showInlineSummary: Content.defaultProps.showInlineSummary,
    hideConfiguration: false,
    displayActionList: undefined,
    icon: "uugdsstencil-edit-emoji-smile",
  },
  //@@viewOff:defaultProps

  render({ hideConfiguration, showInlineSummary, displayActionList, onDeleteDone, ...propsToPass }) {
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
    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal();
    const info = useInfo(viewLsi.info, BRICK_TAG);

    const isDataLoaded = workspaceDto.data !== null && jokeDto.data !== null && preferenceDto.data !== null;

    function handleGetCopyOptions() {
      return { uu5Tag: BRICK_TAG, props: { baseUri, oid } };
    }

    function handleGetRedirectUri() {
      return PlusUtils.Uri.join(baseUri, Route.JOKE, { oid });
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
      info,
      getCopyOptions: handleGetCopyOptions,
      getRedirectUri: handleGetRedirectUri,
    });

    function getActionList(containerParams) {
      const { nestingLevel } = containerParams;
      const actionList = [];

      if (!isDataLoaded) {
        return actionList;
      }

      if (permission.joke.canManage(jokeDto.data)) {
        actionList.push({
          icon: "uugds-pencil",
          children: viewLsi.update,
          collapsed: nestingLevel === "box" ? true : "auto",
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
          collapsed: nestingLevel === "box" ? true : "auto",
        });
      }

      if (permission.joke.canUpdateVisibility(jokeDto.data)) {
        const lsiCode = jokeDto.data.visibility ? "hide" : "show";
        actionList.push({
          icon: jokeDto.data.visibility ? "mdi-eye-off" : "mdi-eye",
          children: viewLsi[lsiCode],
          onClick: () => handleUpdateVisibility(!jokeDto.data.visibility),
          collapsed: nestingLevel === "box" ? true : "auto",
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

      if (permission.joke.canManage(jokeDto.data)) {
        actionList.push({
          icon: "uugds-delete",
          children: viewLsi.delete,
          collapsed: true,
          colorScheme: "negative",
          onClick: () =>
            openDeleteDialog({
              joke: jokeDto.data,
              onSubmit: () => jokeDto.handlerMap.delete(jokeDto.data),
              onSubmitted: () => {
                jokeDto.handlerMap.load?.(); // To switch dto from state readyNoData to state errorNoData
                closeDeleteDialog();
                onDeleteDone?.();
              },
              onCancel: closeDeleteDialog,
            }),
        });
      }

      actionList.push({ divider: true });

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
          routeView={{ controllerProps: { routeDataObject: jokeDto } }}
          inlineView={{ dataToResolve: ["workspace", "joke"] }}
          modalView={{ containerProps: { className: Config.Css.css({ height: "90vh" }) } }} // There is bug in ContentContainer applying height property for box view also to modal view
          boxView={{
            containerProps: {
              footer: isDataLoaded
                ? ({ style }) => <BoxFooter joke={jokeDto.data} preference={preferenceDto.data} style={style} />
                : undefined,
              footerSeparator: true,
              displayActionList,
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
              showInlineSummary={showInlineSummary}
            />
          )}
        </ContentContainer>
        {updateModal.open && <UpdateModal {...updateModal} />}
        {rateModal.open && <RateModal {...rateModal} />}
        {preferenceModal.open && <PreferenceModal {...preferenceModal} />}
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
