//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import JokeContext from "./joke-context";
import Errors from "./joke-provider-errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeProvider",
  //@@viewOff:statics
};

export const JokeProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
    id: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    id: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokeDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        update: handleUpdate,
        addRating: handleAddRating,
        updateVisibility: handleUpdateVisibility,
      },
    });

    function handleLoad() {
      if (!props.baseUri) {
        throw new Errors.NoBaseUriError();
      }

      if (!props.id) {
        throw new Errors.NoIdError();
      }

      return Calls.Joke.get(props.baseUri, { id: props.id });
    }

    function handleUpdate(dtoIn) {
      return Calls.Joke.update(props.baseUri, dtoIn);
    }

    function handleAddRating(dtoIn) {
      return Calls.Joke.addRating(props.baseUri, dtoIn);
    }

    function handleUpdateVisibility(dtoIn) {
      return Calls.Joke.updateVisibility(props.baseUri, dtoIn);
    }

    useEffect(() => {
      if (jokeDataObject.handlerMap.load) {
        jokeDataObject.handlerMap.load().catch((error) => console.error(error));
      }
    }, [props.baseUri, props.id]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokeContext.Provider value={jokeDataObject}>
        {typeof props.children === "function" ? props.children(jokeDataObject) : props.children}
      </JokeContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokeProvider;
