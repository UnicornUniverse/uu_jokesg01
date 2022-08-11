//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import { Tile, TILE_HEIGHT } from "./tile";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

// Space between rows in grid [px]
const ROW_SPACING = 8;

// Height of infoBar for content height prediction [px]
const BARS_HEIGHT = 87;

// The padding around the grid (the content below the bars)
const gridWrapperCss = () => Config.Css.css`padding: ${ROW_SPACING}px`;

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.List.Properties.propTypes,
    ...Config.Types.List.AsyncData.propTypes,
    ...Config.Types.List.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.List.Properties.defaultProps,
    ...Config.Types.List.AsyncData.defaultProps,
    ...Config.Types.List.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [Content.uu5Tag]);

    function handleLoad({ activeSorters }) {
      const [sorter] = activeSorters;
      props.onLoad({ order: sorter?.ascending ? "asc" : "desc" });
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { categoryDataList, rowCount, ...tileProps } = otherProps;
    const attrs = Utils.VisualComponent.getAttrs(elementProps);
    const sorters = getSorters(lsi);

    return (
      <div {...attrs}>
        <Uu5Tiles.ControllerProvider
          data={categoryDataList.data}
          sorters={sorters}
          initialActiveSorters={[sorters.find((s) => s.key === "asc")]}
          onChangeSorters={handleLoad}
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
              height={getGridHeight(rowCount)}
              emptyStateLabel={lsi.noCategories}
              virtualization
            >
              <Tile {...tileProps} />
            </Uu5Tiles.Grid>
          </div>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

function getSorters(lsi) {
  return [
    {
      key: "asc",
      label: lsi.name,
      ascending: true,
    },
    {
      key: "desc",
      label: lsi.name,
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
