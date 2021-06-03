//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import JokeListContext from "./joke-list-context";
import Errors from "./joke-list-provider-errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListProvider",
  //@@viewOff:statics
};

export const JokeListProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
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
        update: handleUpdate,
        delete: handleDelete,
        addRating: handleAddRating,
        updateVisibility: handleUpdateVisibility,
      },
    });

    const criteriaRef = useRef({});

    function handleLoad(criteria) {
      if (!props.baseUri) {
        throw new Errors.NoBaseUriError();
      }

      criteriaRef.current = criteria;
      return Calls.Joke.list(props.baseUri, criteria);
    }

    function handleLoadNext(pageInfo) {
      const dtoIn = { ...criteriaRef.current, pageInfo };
      return Calls.Joke.list(props.baseUri, dtoIn);
    }

    function handleReload() {
      return Calls.Joke.list(props.baseUri, criteriaRef.current);
    }

    function handleCreate(dtoIn) {
      return Calls.Joke.create(props.baseUri, dtoIn);
    }

    function handleUpdate(dtoIn) {
      return Calls.Joke.update(props.baseUri, dtoIn);
    }

    function handleDelete(dtoIn) {
      return Calls.Joke.delete(props.baseUri, dtoIn);
    }

    function handleAddRating(dtoIn) {
      return Calls.Joke.addRating(props.baseUri, dtoIn);
    }

    function handleUpdateVisibility(dtoIn) {
      return Calls.Joke.updateVisibility(props.baseUri, dtoIn);
    }

    useEffect(() => {
      if (jokeDataList.handlerMap.load) {
        jokeDataList.handlerMap.load().catch((error) => console.error(error));
      }
    }, [props.baseUri]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokeListContext.Provider value={jokeDataList}>
        {typeof props.children === "function" ? props.children(jokeDataList) : props.children}
      </JokeListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokeListProvider;
