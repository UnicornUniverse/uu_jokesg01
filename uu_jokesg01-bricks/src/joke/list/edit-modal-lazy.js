//@@viewOn:imports
import { createVisualComponent, useLsi, Utils, useEffect } from "uu5g05";
import { FormSwitchSelect } from "uu5g05-forms";
import UuJokesCore from "uu_jokesg01-core";
import FormFilterMode from "../../common/form-filter-mode.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";

const { EditModal } = Utils.Uu5Loader.get("uu5editingg01-forms", import.meta.url);
const { FormFilterManager, FormSorterManager } = Utils.Uu5Loader.get("uu5tilesg02-editing", import.meta.url);
//@@viewOff:imports

//@@viewOn:helpers
function SorterManager(props) {
  const sorterDefinitionList = UuJokesCore.Joke.List._useSorterDefinitionList();
  return <FormSorterManager {...props} sorterDefinitionList={sorterDefinitionList} />;
}

function FilterManager({ baseUri, oid, ...propsToPass }) {
  return (
    <UuJokesCore.Workspace.Provider baseUri={baseUri}>
      <UuJokesCore.Workspace.PermissionProvider>
        <FilterDefinitionProvider>
          {({ filterDefinitionList, filterKeyList }) => (
            <FormFilterManager
              {...propsToPass}
              filterDefinitionList={filterDefinitionList}
              filterKeyList={filterKeyList}
            />
          )}
        </FilterDefinitionProvider>
      </UuJokesCore.Workspace.PermissionProvider>
    </UuJokesCore.Workspace.Provider>
  );
}

function FilterDefinitionProvider({ children }) {
  const permission = UuJokesCore.Workspace.usePermission();
  const filterDefinitionList = UuJokesCore.Joke.List._useFilterDefinitionList(permission);
  const filterKeyList = UuJokesCore.Utils.Joke.Filter.getVisibleFilterKeyList(permission);

  return children({ filterDefinitionList, filterKeyList });
}
//@@viewOff:helpers

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
        label: lsi.workspaceTab,
        layout: {
          xs: "_helperForDelete_territoryBaseUri, baseUri",
        },
      },
      {
        label: lsi.filterTab,
        layout: {
          xs: "filterList",
        },
      },
      {
        label: lsi.sortingTab,
        layout: {
          xs: "sorterList",
        },
      },
      {
        label: lsi.settingsTab,
        layout: {
          xs: "filterMode, showInlineSummary",
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
          },
        }),
      },
      baseUri: {
        component: UuJokesCore.Workspace.FormSelect,
        props: ({ componentProps }) => ({
          territoryBaseUri: componentProps._helperForDelete_territoryBaseUri,
          required: true,
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
      filterList: {
        component: FilterManager,
        props: ({ componentProps }) => ({
          baseUri: componentProps.baseUri,
        }),
      },
      filterMode: {
        component: FormFilterMode,
      },
      sorterList: {
        component: SorterManager,
      },
      showInlineSummary: {
        component: FormSwitchSelect,
        props: {
          label: lsi.showInlineSummary,
          info: lsi.showInlineSummaryInfo,
          itemList: [
            { value: false, children: lsi.hide },
            { value: true, children: lsi.show },
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
