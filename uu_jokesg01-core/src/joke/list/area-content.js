//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Grid } from "uu5tilesg02-elements";
import { SorterManagerModal, FilterManagerModal, FormFilterManager } from "uu5tilesg02-controls";
import Config from "./config/config.js";
import Tile from "./tile.js";
import FilterBar from "./filter-bar.js";
import SorterBar from "./sorter-bar.js";
import Counter from "./counter.js";
import usePermission from "../../workspace/use-permission.js";
import Joke from "../../utils/joke.js";
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

export const AreaContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onLoadNext: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ onLoadNext, padding, nestingLevel }) {
    //@@viewOn:private
    const permission = usePermission();
    const filterKeyList = Joke.Filter.getVisibleFilterKeyList(permission);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, AreaContent);
    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return (
      <>
        <FilterBar padding={{ left: padding.left, right: padding.right }} filterKeyList={filterKeyList} fixedOrder />
        <SorterBar padding={{ left: padding.left, right: padding.right }} displayManagerButton={false} />
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
          {Tile}
        </Grid>
        {currentNestingLevel === "route" && <Counter className={Css.footer(padding)} />}
        <FilterManagerModal>
          <FormFilterManager filterKeyList={filterKeyList} gridLayout={filterKeyList.join(",")} />
        </FilterManagerModal>
        <SorterManagerModal />
      </>
    );
    //@@viewOff:render
  },
});

export default AreaContent;
