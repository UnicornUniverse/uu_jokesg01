//@@viewOn:imports
import Uu5 from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Joke from "../../utils/joke";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

function useSorterDefinitionList({ sorterList = [] } = {}) {
  const jokeLsi = Uu5.useLsi(importLsi, [Joke.APP_TYPE]);

  const sorterDefList = [
    { key: Joke.Sorter.Keys.NAME, label: jokeLsi.keys.name },
    { key: Joke.Sorter.Keys.RATING, label: jokeLsi.keys.averageRating },
    { key: Joke.Sorter.Keys.CREATE_TS, label: jokeLsi.keys.sys.cts },
  ];

  return Uu5Tiles.Utils.SorterList.mergeDefinitionList(sorterList, sorterDefList);
}

//@@viewOn:exports
export { useSorterDefinitionList };
export default useSorterDefinitionList;
//@@viewOff:exports
