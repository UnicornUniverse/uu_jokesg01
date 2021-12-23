//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "calls";
import Context from "./context";
import Errors from "./errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Provider",
  //@@viewOff:statics
};

export const Provider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    id: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
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
        const prevProps = prevPropsRef.current;

        // No change of baseUri and id = no reload is required
        if (prevProps.baseUri === props.baseUri && prevPropsRef.current.id === props.id) {
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
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, jokeDataObject]);

    // There is only 1 atribute now but we are ready for future expansion
    // HINT: Data are wrapped by object for future expansion of values with backward compatibility
    const value = useMemo(() => {
      return { jokeDataObject };
    }, [jokeDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Context.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

export default Provider;
