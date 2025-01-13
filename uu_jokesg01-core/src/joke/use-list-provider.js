//@@viewOn:imports
import { useDataList, useMemo, useValueChange, useRef, useEffect, useCallback } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Uu5Tiles from "uu5tilesg02";
import Calls from "calls";
import Joke from "../utils/joke";
//@@viewOff:imports

//@@viewOn:helpers
function getLoadDtoIn(filterList, sorterList, pageInfo) {
  const filterMap = Uu5Tiles.Utils.FilterList.toMap(filterList);

  let dtoIn = {};

  dtoIn.categoryIdList = filterMap.categoryIdList;

  switch (filterMap.visibility) {
    case Joke.Filter.Visibility.PUBLISHED:
      dtoIn.visibility = true;
      break;
    case Joke.Filter.Visibility.UNPUBLISHED:
      dtoIn.visibility = false;
      break;
    default:
      dtoIn.visibility = undefined;
      break;
  }

  let sorter = sorterList.at(0);

  if (sorter) {
    dtoIn.sortBy = sorter.key;
    dtoIn.order = sorter.ascending ? "asc" : "desc";
  }

  if (pageInfo) {
    dtoIn.pageInfo = pageInfo;
  }

  return dtoIn;
}

function shrinkSorterList(sorterList) {
  if (sorterList.length > 1) {
    return [sorterList[sorterList.length - 1]];
  } else {
    return sorterList;
  }
}
//@@viewOff:helpers

function useListProvider({
  baseUri: propBaseUri,
  filterList: propFilterList = [],
  sorterList: propSorterList = [],
  onFilterListChange,
  onSorterListChange,
  skipInitialLoad = false,
}) {
  const [filterList, setFilterList] = useValueChange(propFilterList, onFilterListChange);
  const [sorterList, setSorterList] = useValueChange(shrinkSorterList(propSorterList), onSorterListChange);
  const subApp = useSubApp();
  const imageUrlListRef = useRef([]);

  const baseUri = propBaseUri ?? subApp.baseUri;

  const jokeDataList = useDataList(
    {
      skipInitialLoad,
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
        addRating: handleAddRating,
        updateVisibility: handleUpdateVisibility,
        loadImage: handleLoadImage,
      },
    },
    [baseUri, filterList, sorterList],
  );

  useEffect(() => {
    // We don't use it to store reference on another React component
    // eslint-disable-next-line uu5/hooks-exhaustive-deps
    return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function handleLoad({ pageInfo } = {}) {
    const dtoIn = getLoadDtoIn(filterList, sorterList, pageInfo);
    return Calls.Joke.list(baseUri, dtoIn);
  }

  function handleLoadNext(pageInfo) {
    return handleLoad({ pageInfo });
  }

  async function handleLoadImage(joke) {
    // TODO MFA generate only one access key for whole collection
    const {
      baseUri: binaryBaseUri,
      awid: clientAwid,
      accessKey,
      code,
    } = await Calls.Binary.createAccessKey(baseUri, { code: joke.image });

    const imageDtoIn = { clientAwid, accessKey, code };
    const imageDtoOut = await Calls.Binary.getData(binaryBaseUri, imageDtoIn);
    const imageFile = imageDtoOut.data;
    const imageUrl = generateAndRegisterImageUrl(imageFile);

    return mergeDataObject({ imageFile, imageUrl });
  }

  async function handleCreate(values) {
    let joke = await Calls.Joke.create(baseUri, values);
    joke.imageFile = values.image;
    joke.imageUrl = values.image ? generateAndRegisterImageUrl(values.image) : undefined;
    return joke;
  }

  async function handleUpdate(values) {
    let joke = await Calls.Joke.update(baseUri, values);
    joke.imageFile = values.image;
    joke.imageUrl = values.image && generateAndRegisterImageUrl(values.image);
    return mergeDataObject(joke);
  }

  function handleDelete({ id }) {
    return Calls.Joke.delete(baseUri, { id });
  }

  async function handleAddRating({ id, rating }) {
    const dtoOut = await Calls.Joke.addRating(baseUri, { id, rating });
    return mergeDataObject(dtoOut);
  }

  async function handleUpdateVisibility({ id, visibility }) {
    const dtoOut = await Calls.Joke.updateVisibility(baseUri, { id, visibility });
    return mergeDataObject(dtoOut);
  }

  const handleSetSorterList = useCallback(
    (sorterList) => {
      setSorterList(shrinkSorterList(sorterList));
    },
    [setSorterList],
  );

  function mergeDataObject(dataObject) {
    return (prevDataObject) => {
      return { ...prevDataObject, ...dataObject };
    };
  }

  function generateAndRegisterImageUrl(imageFile) {
    const imageUrl = URL.createObjectURL(imageFile);
    imageUrlListRef.current.push(imageUrl);
    return imageUrl;
  }

  const value = useMemo(
    () => ({ jokeDataList, baseUri, filterList, sorterList, setFilterList, setSorterList: handleSetSorterList }),
    [jokeDataList, baseUri, filterList, sorterList, setFilterList, handleSetSorterList],
  );

  return value;
}

//@@viewOn:exports
export { useListProvider };
export default useListProvider;
//@@viewOff:exports
