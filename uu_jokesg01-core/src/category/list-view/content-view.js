//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import { Tile, TILE_HEIGHT } from "./tile";
import Config from "./config/config";
import LsiData from "./content-view-lsi";
//@@viewOff:imports

// Space between rows in grid [px]
const ROW_SPACING = 8;

// Height of infoBar for content height prediction [px]
const BARS_HEIGHT = 87;

// The padding around the grid (the content below the bars)
const gridWrapperCss = () => Config.Css.css`padding: ${ROW_SPACING}px`;

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ContentView",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const ContentView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryList: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    baseUri: PropTypes.string,
    jokesPermission: PropTypes.object.isRequired,
    rowCount: PropTypes.number,
    onCopyComponent: PropTypes.func,
    onLoad: PropTypes.func,
    onReload: PropTypes.func,
    onCreate: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
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
        nestingLevel={props.nestingLevel}
        disabled={props.disabled}
        hidden={props.hidden}
        className={props.className}
        style={props.style}
        mainAttrs={props.mainAttrs}
        noIndex={props.noIndex}
        ref_={props.ref_}
      >
        {/* Update BARS_HEIGHT in case of bars setup changes */}
        <Uu5Tiles.InfoBar />
        <div className={gridWrapperCss()}>
          <Uu5Tiles.Grid
            tileMinWidth={270}
            tileMaxWidth={600}
            tileHeight={TILE_HEIGHT}
            tileSpacing={8}
            rowSpacing={ROW_SPACING}
            height={getGridHeight(props.rowCount)}
            emptyStateLabel={LsiData.noCategories}
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

function getSorters() {
  return [
    {
      key: "asc",
      label: LsiData.name,
      ascending: true,
    },
    {
      key: "desc",
      label: LsiData.name,
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
export default ContentView;
