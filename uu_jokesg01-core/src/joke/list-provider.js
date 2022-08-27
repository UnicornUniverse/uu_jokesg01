//@@viewOn:imports
import { createComponent, PropTypes, useDataList, useEffect, useRef, useMemo } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
import JokeListContext from "./list-context";
import ListView from "./list-view";
//@@viewOff:imports

//@@viewOn:helpers
function getLoadDtoIn(filterList, sorter, pageInfo) {
  const filterMap = filterList.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

  let dtoIn = { ...filterMap };

  if (sorter) {
    dtoIn.sortBy = sorter.key;
    dtoIn.order = sorter.ascending ? "asc" : "desc";
  }

  if (pageInfo) {
    dtoIn.pageInfo = pageInfo;
  }

  dtoIn.loadCategoryList = true;

  return dtoIn;
}

function setCategoryList(jokeList, categoryList) {
  return jokeList.map((joke) => {
    if (joke.categoryIdList?.lenght === 0) {
      return joke;
    }

    const newJoke = { ...joke };
    newJoke.categoryList = [];

    newJoke.categoryIdList.forEach((id) => {
      const category = categoryList.find((category) => category.id === id);
      newJoke.categoryList.push(category);
    });

    return newJoke;
  });
}
//@@viewOff:helpers

export const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    skipInitialLoad: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipInitialLoad: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokeDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        reload: handleReload,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
        addRating: handleAddRating,
        updateVisibility: handleUpdateVisibility,
        getImage: handleGetImage,
      },
      skipInitialLoad: props.skipInitialLoad,
    });

    const prevPropsRef = useRef(props);
    const filterList = useRef([]);
    const sorterList = useRef([]);
    const imageUrlListRef = useRef([]);

    async function handleLoad(criteria) {
      filterList.current = criteria?.filterList || [];

      let sorter;

      if (criteria?.sorterList) {
        sorter = criteria.sorterList.at(criteria.sorterList.length - 1);
        sorterList.current = sorter ? [sorter] : [];
      } else {
        sorter = sorter ?? sorterList.current.at(0);
      }

      const dtoIn = getLoadDtoIn(filterList.current, sorter, criteria?.pageInfo);
      const dtoOut = await Calls.Joke.list(dtoIn, props.baseUri);
      const jokeList = setCategoryList(dtoOut.itemList, dtoOut.categoryList);
      return { itemList: jokeList, pageInfo: dtoOut.pageInfo };
    }

    async function handleLoadNext(pageInfo) {
      const criteria = getLoadDtoIn(filterList.current, sorterList.current, pageInfo);
      const dtoIn = { ...criteria, pageInfo };
      const dtoOut = Calls.Joke.list(dtoIn, props.baseUri);
      const jokeList = setCategoryList(dtoOut.itemList, dtoOut.categoryList);
      return { itemList: jokeList, pageInfo: dtoOut.pageInfo };
    }

    function handleReload() {
      return handleLoad({ filterList: filterList.current, sorterList: sorterList.current });
    }

    function handleCreate(values) {
      return Calls.Joke.create(values, props.baseUri);
    }

    async function handleUpdate(values) {
      const joke = await Calls.Joke.update(values, props.baseUri);
      const imageUrl = values.image && generateAndRegisterImageUrl(values.image);
      return mergeDataObject({ ...joke, imageFile: values.image, imageUrl });
    }

    function handleDelete(joke) {
      const dtoIn = { id: joke.id };
      return Calls.Joke.delete(dtoIn, props.baseUri);
    }

    async function handleAddRating(joke, rating) {
      const dtoIn = { id: joke.id, rating };
      const dtoOut = await Calls.Joke.addRating(dtoIn, props.baseUri);
      return mergeDataObject(dtoOut);
    }

    async function handleUpdateVisibility(joke, visibility) {
      const dtoIn = { id: joke.id, visibility };
      const dtoOut = await Calls.Joke.updateVisibility(dtoIn, props.baseUri);
      return mergeDataObject(dtoOut);
    }

    async function handleGetImage(joke) {
      const dtoIn = { code: joke.image };
      const imageFile = await Calls.Joke.getImage(dtoIn, props.baseUri);
      const imageUrl = generateAndRegisterImageUrl(imageFile);
      return mergeDataObject({ imageFile, imageUrl });
    }

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

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change of baseUri = no reload is required
        if (prevProps.baseUri === props.baseUri) {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (!jokeDataList.handlerMap.load) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await jokeDataList.handlerMap.load();
        } catch (error) {
          ListView.logger.error("Error while reloading data", error);
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, jokeDataList]);

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    // There is only 1 atribute now but we are ready for future expansion
    // HINT: Data are wrapped by object for future expansion of values with backward compatibility
    const value = useMemo(() => {
      return { jokeDataList, filterList: filterList.current, sorterList: sorterList.current };
    }, [jokeDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokeListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </JokeListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ListProvider;
