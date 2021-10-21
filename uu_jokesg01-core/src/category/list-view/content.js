//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import { Tile, TILE_HEIGHT } from "./tile";
import Config from "./config/config";
import Lsi from "./content-lsi";
//@@viewOff:imports

// Space between rows in grid [px]
const ROW_SPACING = 8;

// Height of action bar + filter bar + infoBar for content height prediction [px]
const BARS_HEIGHT = 127;

// The padding around the grid (the content below the bars)
const gridWrapperCss = () => Config.Css.css`padding: ${ROW_SPACING}px`;

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const Content = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryList: UU5.PropTypes.array.isRequired,
    pageSize: UU5.PropTypes.number.isRequired,
    baseUri: UU5.PropTypes.string,
    jokesPermission: UU5.PropTypes.object.isRequired,
    rowCount: UU5.PropTypes.number,
    onCopyComponent: UU5.PropTypes.func,
    onLoad: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: undefined,
    pageSize: undefined,
    baseUri: undefined,
    jokesPermission: undefined,
    rowCount: undefined,
    showCopyComponent: true,
    onCopyComponent: () => {},
    onLoad: () => {},
    onReload: () => {},
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleLoad({ activeSorters }) {
      const [sorter] = activeSorters;
      props.onLoad({ order: sorter?.ascending ? "asc" : "desc" });
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function CategoryTile({ data }) {
      return (
        <Tile
          categoryDataObject={data}
          jokesPermission={props.jokesPermission}
          baseUri={props.baseUri}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
      );
    }

    return (
      <Uu5Tiles.ControllerProvider
        data={props.categoryList}
        sorters={getSorters()}
        onChangeSorters={handleLoad}
        nestingLevel={currentNestingLevel}
        disabled={props.disabled}
        hidden={props.hidden}
        className={props.className}
        style={props.style}
        mainAttrs={props.mainAttrs}
        noIndex={props.noIndex}
        ref_={props.ref_}
      >
        {/* Update BARS_HEIGHT in case of bars setup changes */}
        <Uu5Tiles.ActionBar searchable={false} actions={getActions(props)} />
        <Uu5Tiles.InfoBar />
        <div className={gridWrapperCss()}>
          <Uu5Tiles.Grid
            tileMinWidth={270}
            tileMaxWidth={600}
            tileHeight={TILE_HEIGHT}
            tileSpacing={8}
            rowSpacing={ROW_SPACING}
            height={getGridHeight(props.rowCount)}
            emptyStateLabel={Lsi.noCategories}
            virtualization
          >
            {CategoryTile}
          </Uu5Tiles.Grid>
        </div>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});
function getActions({ jokesPermission, onCreate, onReload, onCopyComponent, showCopyComponent }) {
  const actionList = [];

  if (jokesPermission.category.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      content: Lsi.createCategory,
      active: true,
      onClick: onCreate,
      bgStyle: "filled",
      colorSchema: "primary",
    });
  }

  actionList.push({
    icon: "mdi-reload",
    content: Lsi.reloadList,
    onClick: onReload,
    bgStyle: "outline",
    colorSchema: "primary",
  });

  if (showCopyComponent) {
    actionList.push({
      content: Lsi.copyComponent,
      onClick: onCopyComponent,
    });
  }

  return actionList;
}

function getSorters() {
  return [
    {
      key: "asc",
      label: Lsi.name,
      ascending: true,
    },
    {
      key: "desc",
      label: Lsi.name,
      ascending: false,
    },
  ];
}

function getGridHeight(rowCount) {
  return !rowCount ? null : rowCount * (TILE_HEIGHT + ROW_SPACING) - ROW_SPACING;
}

// Function returns prediction of the content height [px]
export function getContentHeight(rowCount) {
  return getGridHeight(rowCount) + BARS_HEIGHT;
}
//@@viewOff:helpers
export default Content;
