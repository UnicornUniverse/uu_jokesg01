//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent } from "uu5g04-hooks";
import { CategoryListTile, TILE_HEIGHT } from "./category-list-tile"
import Config from "./config/config";
import Lsi from "./category-list-content-lsi";
//@@viewOff:imports

// Space between rows in grid [px]
const ROW_SPACING = 8;

// Height of action bar + filter bar + infoBar for content height prediction [px]
const BARS_HEIGHT = 139;

const gridWrapperCss = () => Config.Css.css`padding: 8px`;
const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryListContent",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const CategoryListContent = createVisualComponent({
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
    showCopyComponent: false,
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
    function handleLoad({activeSorters}) {
      const [sorter] = activeSorters;
      props.onLoad({order : sorter?.ascending ? "asc" : "desc"});
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function Tile({ data }) {
      return (
        <CategoryListTile
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
        attrs={attrs}
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
            {Tile}
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
      active: true,
      onClick: onCreate,
      bgStyle: "filled",
      colorSchema: "primary",
    });
  }

  actionList.push({
    icon: "mdi-reload",
    active: true,
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
export default CategoryListContent;
