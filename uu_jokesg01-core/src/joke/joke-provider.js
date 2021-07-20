//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef } from "uu5g04-hooks";
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
    baseUri: UU5.PropTypes.string,
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

    const prevPropsRef = useRef(props);

    function handleLoad() {
      if (!props.id) {
        throw new Errors.NoIdError();
      }

      const dtoIn = { id: props.id };
      return Calls.Joke.get(dtoIn, props.baseUri);
    }

    function handleUpdate(values) {
      const dtoIn = { id: jokeDataObject.data.id, ...values };
      return Calls.Joke.update(dtoIn, props.baseUri);
    }

    function handleAddRating(rating) {
      const dtoIn = { id: jokeDataObject.data.id, rating };
      return Calls.Joke.addRating(dtoIn, props.baseUri);
    }

    function handleUpdateVisibility(visibility) {
      const dtoIn = { id: jokeDataObject.data.id, visibility };
      return Calls.Joke.updateVisibility(dtoIn, props.baseUri);
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        // No change of baseUri and id = no reload is required
        if (prevPropsRef.current.baseUri === props.baseUri && prevPropsRef.current.id === props.id) {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (!jokeDataObject.handlerMap.load) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await jokeDataObject.handlerMap.load();
        } catch (error) {
          console.error(error);
        }
      }

      checkPropsAndReload();
    }, [props, jokeDataObject]);
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
