//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useMemo } from "uu5g05";
import { Grid } from "uu5tilesg02-elements";
import { SorterManagerModal, FilterManagerModal } from "uu5tilesg02-controls";
import Config from "./config/config.js";
import Tile from "./tile.js";
import FilterBar from "./filter-bar.js";
import SorterBar from "./sorter-bar.js";
import Counter from "./counter.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  list: (padding) => Config.Css.css({ flex: 1, minHeight: 0, paddingBottom: padding.top }),
  footer: (padding) =>
    Config.Css.css({
      paddingLeft: padding.left,
      paddingRight: padding.right,
      paddingBottom: padding.bottom,
      paddingTop: padding.top,
    }),
};
//@@viewOff:css

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  nestingLevel: ["route", "area", "inline"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onLoadNext: PropTypes.func.isRequired,
    getItemActionList: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { getItemActionList, onLoadNext, padding, nestingLevel } = props;

    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);

    const TileWrapper = useMemo(() => {
      return (tileProps) => <Tile {...tileProps} getItemActionList={getItemActionList} />;
    }, [getItemActionList]);

    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return (
      <>
        <FilterBar padding={{ left: padding.left, right: padding.right }} />
        <SorterBar padding={{ left: padding.left, right: padding.right }} />
        <Grid
          className={currentNestingLevel === "area" ? Css.list(padding) : undefined}
          height={currentNestingLevel === "area" ? "auto" : undefined}
          elementAttrs={{ role: "list" }}
          padding={padding}
          onLoad={onLoadNext}
          tileMinWidth={270}
          tileMaxWidth={600}
          tileHeight={300}
          horizontalGap={padding.left}
          verticalGap={padding.top}
        >
          {TileWrapper}
        </Grid>
        {currentNestingLevel === "route" && <Counter className={Css.footer(padding)} />}
        <FilterManagerModal />
        <SorterManagerModal />
      </>
    );
    //@@viewOff:render
  },
});

export default Content;
