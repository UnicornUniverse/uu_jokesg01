//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { UuGds } from "uu5g05-elements";
import { Grid } from "uu5tilesg02-elements";
import { SorterBar, SorterManagerModal } from "uu5tilesg02-controls";
import Tile from "./tile";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
export const TILE_HEIGHT = 45;

// Space between rows in grid [px]
const ROW_SPACING = UuGds.SpacingPalette.getValue(["fixed", "c"]);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  grid: () => Config.Css.css({ marginTop: UuGds.SpacingPalette.getValue(["fixed", "c"]) }),
  tile: () =>
    Config.Css.css({
      height: TILE_HEIGHT,
    }),
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
    const lsi = useLsi(importLsi, [Content.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { categoryDataList, rowCount, ...tileProps } = otherProps;
    const attrs = Utils.VisualComponent.getAttrs(elementProps);

    return (
      <div {...attrs}>
        {/* Update BARS_HEIGHT in case of bars setup changes */}
        <SorterBar />
        <Grid
          tileMinWidth={270}
          tileMaxWidth={600}
          tileHeight={TILE_HEIGHT}
          horizontalGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
          verticalGap={ROW_SPACING}
          height={getGridHeight(rowCount)}
          emptyState={lsi.noCategories}
          className={Css.grid()}
        >
          <Tile {...tileProps} className={Css.tile()} />
        </Grid>
        <SorterManagerModal />
      </div>
    );
    //@@viewOff:render
  },
});

function getGridHeight(rowCount) {
  return !rowCount ? null : rowCount * (TILE_HEIGHT + ROW_SPACING) - ROW_SPACING;
}

// Function returns prediction of the content height [px]
export function getContentHeight(rowCount) {
  return getGridHeight(rowCount);
}
//@@viewOff:helpers
export default Content;
