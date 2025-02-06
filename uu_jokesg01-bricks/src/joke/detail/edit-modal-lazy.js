//@@viewOn:imports
import { createVisualComponent, useLsi, Utils, useEffect } from "uu5g05";
import { FormSwitchSelect } from "uu5g05-forms";
import UuJokesCore from "uu_jokesg01-core";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";

const { EditModal } = Utils.Uu5Loader.get("uu5editingg01-forms", import.meta.url);
//@@viewOff:imports

const EditModalLazy = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModalLazy",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { componentType, componentProps, onSave, onClose, onReady } = props;
    const lsi = useLsi(importLsi, [EditModalLazy.uu5Tag]);

    useEffect(() => {
      onReady?.();
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    const tabList = [
      {
        label: lsi.propertyTab,
        layout: {
          xs: "_helperForDelete_territoryBaseUri, baseUri, oid",
        },
      },
      {
        label: lsi.settingsTab,
        layout: {
          xs: "showAuthor, showCreationTime, showCategories, hideConfiguration, showInlineSummary",
        },
      },
      {
        label: lsi.spacingTab,
        layout: {
          xs: "spacing",
        },
      },
      {
        template: "visual",
        layout: {
          xs: `nestingLevel, colorScheme, significance, identificationType, card, aspectRatio, size, width, height, minHeight, maxHeight, borderRadius`,
          m: `nestingLevel nestingLevel,
              colorScheme significance,
              identificationType identificationType,
              card card,
              aspectRatio size,
              width height,
              minHeight maxHeight,
              borderRadius borderRadius`,
        },
        columns: { m: "repeat(2, 1fr)" },
      },
      {
        template: "system",
      },
    ];

    const propInputMap = {
      _helperForDelete_territoryBaseUri: {
        component: UuJokesCore.Territory.FormSelect,
        props: ({ componentProps: newProps }) => ({
          baseUri: newProps.baseUri ?? componentProps.baseUri,
          required: true,
          onChange: (event) => {
            event.data.form.setItemValue("baseUri", undefined);
            event.data.form.setItemValue("oid", undefined);
          },
        }),
      },
      baseUri: {
        component: UuJokesCore.Workspace.FormSelect,
        props: ({ componentProps }) => ({
          territoryBaseUri: componentProps._helperForDelete_territoryBaseUri,
          required: true,
          onChange: (event) => {
            event.data.form.setItemValue("oid", undefined);
          },
        }),
      },
      oid: {
        component: UuJokesCore.Joke.FormSelect,
        props: ({ componentProps }) => ({
          baseUri: componentProps.baseUri,
          required: true,
          disabled: !componentProps.baseUri,
        }),
      },
      nestingLevel: {
        props: {
          valueList: componentType.nestingLevel.concat([undefined]),
        },
      },
      borderRadius: {
        props: {
          valueList: ["none", "elementary", "moderate", "expressive"],
        },
      },
      showAuthor: {
        component: FormSwitchSelect,
        props: {
          label: lsi.showAuthor,
          itemList: [
            { value: true, children: lsi.show },
            { value: false, children: lsi.hide },
          ],
        },
      },
      showCreationTime: {
        component: FormSwitchSelect,
        props: {
          label: lsi.showCreationTime,
          itemList: [
            { value: true, children: lsi.show },
            { value: false, children: lsi.hide },
          ],
        },
      },
      showCategories: {
        component: FormSwitchSelect,
        props: {
          label: lsi.showCategories,
          itemList: [
            { value: true, children: lsi.show },
            { value: false, children: lsi.hide },
          ],
        },
      },
      showInlineSummary: {
        component: FormSwitchSelect,
        props: {
          label: lsi.showInlineSummary,
          itemList: [
            { value: false, children: lsi.hide },
            { value: true, children: lsi.show },
          ],
        },
      },
      hideConfiguration: {
        component: FormSwitchSelect,
        props: {
          label: lsi.hideConfiguration,
          itemList: [
            { value: false, children: lsi.show },
            { value: true, children: lsi.hide },
          ],
        },
      },
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <EditModal
        uu5Tag={componentType.uu5Tag}
        header={lsi.header}
        props={componentProps}
        tabList={tabList}
        propInputMap={propInputMap}
        onSave={onSave}
        onClose={onClose}
        open
      />
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export { EditModalLazy };
export default EditModalLazy;
//viewOff:exports
