//@@viewOn:imports
import Uu5 from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Category from "../../utils/category";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

function useSorterDefinitionList({ sorterList = [] } = {}) {
  const categoryLsi = Uu5.useLsi(importLsi, [Category.APP_TYPE]);

  const sorterDefList = [{ key: Category.Sorter.Keys.NAME, label: categoryLsi.keys.name }];

  return Uu5Tiles.Utils.SorterList.mergeDefinitionList(sorterList, sorterDefList);
}

//@@viewOn:exports
export { useSorterDefinitionList };
export default useSorterDefinitionList;
//@@viewOff:exports
