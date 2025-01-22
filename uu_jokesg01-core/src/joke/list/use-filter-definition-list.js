//@@viewOn:imports
import Uu5 from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5Elements from "uu5g05-elements";
import Joke from "../../utils/joke";
import CategorySelect from "../../category/select";
import Badge from "../../category/common/badge";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

function useFilterDefinitionList(permission, { filterList = [] } = {}) {
  const jokeLsi = Uu5.useLsi(importLsi, [Joke.APP_TYPE]);
  const filterDefList = [];

  if (permission.joke.canUpdateVisibility()) {
    filterDefList.push({
      key: Joke.Filter.Keys.VISIBILITY,
      label: jokeLsi.keys.visibility,
      inputType: "switch-select",
      inputProps: {
        itemList: [
          { value: Joke.Filter.Visibility.ALL, children: jokeLsi.visibility.all },
          { value: Joke.Filter.Visibility.PUBLISHED, children: jokeLsi.visibility.published },
          { value: Joke.Filter.Visibility.UNPUBLISHED, children: jokeLsi.visibility.unpublished },
        ],
      },
    });
  }

  filterDefList.push({
    key: "categoryIdList",
    label: "Category",
    inputType: CategorySelect.Input,
    inputProps: {
      multiple: true,
    },
    valueFormatter: (value) =>
      value.map((id) => (
        <Badge
          key={id}
          oid={id}
          nestingLevel="inline"
          className={Config.Css.css({ marginRight: Uu5Elements.UuGds.SpacingPalette.getValue(["inline", "d"]) })}
        />
      )),
  });

  return Uu5Tiles.Utils.FilterList.mergeDefinitionList(filterList, filterDefList);
}

//@@viewOn:exports
export { useFilterDefinitionList };
export default useFilterDefinitionList;
//@@viewOff:exports
