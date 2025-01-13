//@@viewOn:imports
import { useDataList, useMemo, useValueChange, useCallback } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:helpers
function shrinkSorterList(sorterList) {
  if (sorterList.length > 1) {
    return [sorterList[sorterList.length - 1]];
  } else {
    return sorterList;
  }
}
//@@viewOff:helpers

function useListProvider({
  baseUri,
  skipInitialLoad = false,
  sorterList: propSorterList = [],
  onSorterListChange,
  serieList: propSerieList,
  onSerieListChange,
}) {
  const [sorterList, setSorterList] = useValueChange(shrinkSorterList(propSorterList), onSorterListChange);
  const [serieList, setSerieList] = useValueChange(propSerieList, onSerieListChange);
  const subApp = useSubApp();

  baseUri = baseUri ?? subApp.baseUri;
  const canLoad = baseUri ? true : false;

  const categoryDataList = useDataList(
    {
      skipInitialLoad: baseUri ? skipInitialLoad : false,
      pageSize: 200, // category schema has maxNoi 128
      handlerMap: {
        load: canLoad ? handleLoad : undefined,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
      },
    },
    [baseUri, sorterList],
  );

  function handleLoad({ pageInfo } = {}) {
    let dtoIn = { pageInfo };

    const sorter = sorterList.at(0);

    if (sorter) {
      dtoIn.order = sorter.ascending ? "asc" : "desc";
    }

    return Calls.Category.list(baseUri, dtoIn);
  }

  function handleCreate(values) {
    return Calls.Category.create(baseUri, values);
  }

  function handleUpdate(values) {
    return Calls.Category.update(baseUri, values);
  }

  function handleDelete({ id }) {
    return Calls.Category.delete(baseUri, { id });
  }

  const handleSetSorterList = useCallback(
    (sorterList) => {
      setSorterList(shrinkSorterList(sorterList));
    },
    [setSorterList],
  );

  const value = useMemo(
    () => ({ categoryDataList, baseUri, sorterList, setSorterList: handleSetSorterList, serieList, setSerieList }),
    [categoryDataList, baseUri, sorterList, handleSetSorterList, serieList, setSerieList],
  );

  return value;
}

//@@viewOn:exports
export { useListProvider };
export default useListProvider;
//@@viewOff:exports
