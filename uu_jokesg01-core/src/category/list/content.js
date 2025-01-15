//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useMemo } from "uu5g05";
import { useController } from "uu5tilesg02";
import { List } from "uu5tilesg02-elements";
import { Counter, SerieManagerModal, SorterManagerModal } from "uu5tilesg02-controls";
import Config from "./config/config.js";
import Tile from "./tile.js";
import Cell from "./cell.js";
import SorterBar from "./sorter-bar.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  list: () => Config.Css.css({ flex: 1, minHeight: 0 }),
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { getItemActionList, onLoadNext, padding, nestingLevel } = props;
    const { serieList } = useController();

    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);

    const columnList = useMemo(() => {
      const CellWrapper = (cellProps) => <Cell {...cellProps} />;

      return serieList.map((serie) => ({ value: serie.value, cellComponent: CellWrapper }));
    }, [serieList]);
    //@@viewOff:private

    //@@viewOn:render
    if (currentNestingLevel === "inline") {
      return null;
    }

    return (
      <>
        <SorterBar padding={{ left: padding.left, right: padding.right }} />
        {currentNestingLevel === "route" && <Counter className={Css.footer(padding)} />}
        <List
          className={currentNestingLevel === "area" ? Css.list() : undefined}
          height={currentNestingLevel === "area" ? "auto" : undefined}
          verticalAlignment="center"
          onLoad={onLoadNext}
          columnList={columnList}
          spacing="loose"
          getActionList={getItemActionList}
          padding={padding}
        >
          {Tile}
        </List>
        <SorterManagerModal />
        <SerieManagerModal />
      </>
    );
    //@@viewOff:render
  },
});

export default Content;
