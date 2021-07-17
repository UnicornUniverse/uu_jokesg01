//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import JokeListContext from "./joke-list-context";
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
    baseUri: UU5.PropTypes.string,
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
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
        addRating: handleAddRating,
        updateVisibility: handleUpdateVisibility,
      },
    });

    const criteriaRef = useRef({});

    function handleLoad(criteria) {
      criteriaRef.current = criteria;
      return Calls.Joke.list(criteria, props.baseUri);
    }

    function handleLoadNext(pageInfo) {
      const dtoIn = { ...criteriaRef.current, pageInfo };
      return Calls.Joke.list(dtoIn, props.baseUri);
    }

    function handleReload() {
      return jokeDataList.handlerMap.load(criteriaRef.current);
    }

    function handleCreate(values) {
      return Calls.Joke.create(values, props.baseUri);
    }

    function handleUpdate(values) {
      return Calls.Joke.update(values, props.baseUri);
    }

    function handleDelete(joke) {
      const dtoIn = { id: joke.id };
      return Calls.Joke.delete(dtoIn, props.baseUri);
    }

    function handleAddRating(joke, rating) {
      const dtoIn = { id: joke.id, rating };
      return Calls.Joke.addRating(dtoIn, props.baseUri);
    }

    function handleUpdateVisibility(joke, visibility) {
      const dtoIn = { id: joke.id, visibility };
      return Calls.Joke.updateVisibility(dtoIn, props.baseUri);
    }

    useEffect(() => {
      if (jokeDataList.handlerMap.load) {
        jokeDataList.handlerMap.load().catch((error) => console.error(error));
      }
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
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
