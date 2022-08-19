//@@viewOn:imports
// ISSUE Uu5Tiles - Waiting for new generation with support of uu5g05-forms
import { createVisualComponent, Utils, useMemo, useMemoObject } from "uu5g05";
import { UuGds } from "uu5g05-elements";
import { Grid } from "uu5tilesg02-elements";
import { FilterBar, FilterManagerModal, SorterBar, SorterManagerModal } from "uu5tilesg02-controls";
import Config from "./config/config";
import { Tile } from "./tile";
//@@viewOff:imports

//@@viewOn:constants
const TILE_HEIGHT = 400;

// Space between rows in grid [px]
const ROW_SPACING = UuGds.SpacingPalette.getValue(["fixed", "c"]);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  grid: () => Config.Css.css({ marginTop: UuGds.SpacingPalette.getValue(["fixed", "c"]) }),
};
//@@viewOff:css

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
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { jokeDataList, rowCount, onLoadNext, ...tileProps } = otherProps;
    const pageSize = jokeDataList.pageSize;

    function handleLoadNext({ indexFrom }) {
      onLoadNext({ pageSize: pageSize, pageIndex: Math.floor(indexFrom / pageSize) });
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(elementProps);
    const memoTileProps = useMemoObject(tileProps, Utils.Object.shallowEqual);
    const TileComponent = useMemo(() => {
      return <Tile {...memoTileProps} />;
    }, [memoTileProps]);

    return (
      <div {...attrs}>
        <FilterBar />
        <SorterBar />
        <Grid
          onLoad={handleLoadNext}
          tileMinWidth={270}
          tileMaxWidth={600}
          tileHeight={TILE_HEIGHT}
          horizontalGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
          verticalGap={ROW_SPACING}
          height={getGridHeight(rowCount)}
          className={Css.grid()}
        >
          {TileComponent}
        </Grid>
        <FilterManagerModal />
        <SorterManagerModal />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getGridHeight(rowCount) {
  return !rowCount ? null : rowCount * (TILE_HEIGHT + ROW_SPACING) - ROW_SPACING;
}

// Function returns prediction of the content height [px]
export function getContentHeight(rowCount) {
  return getGridHeight(rowCount);
}
//@@viewOff:helpers

export default Content;
