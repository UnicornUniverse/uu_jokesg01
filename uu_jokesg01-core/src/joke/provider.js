//@@viewOn:imports
import { createComponent, PropTypes, useDataObject, useEffect, useRef, useMemo } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
import Context from "./context";
import Errors from "./errors";
//@@viewOff:imports

export const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    oid: PropTypes.string.isRequired,
    skipImageLoad: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipImageLoad: false,
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

    async function handleLoad() {
      if (!props.oid) {
        throw new Errors.NoOidError();
      }

      const jokeDtoIn = { id: props.oid };
      let joke = await Calls.Joke.get(jokeDtoIn, props.baseUri);

      if (joke.categoryIdList.length) {
        const categoryList = await Calls.Category.list({ idList: joke.categoryIdList }, props.baseUri);
        joke.categoryList = categoryList.itemList;
      }

      if (joke.image && !props.skipImageLoad) {
        const imageDtoIn = { code: joke.image };
        joke.imageFile = await Calls.Joke.getImage(imageDtoIn, props.baseUri);
        joke.imageUrl = generateImageUrl(joke.imageFile);
      }

      return joke;
    }

    async function handleUpdate(values) {
      const dtoIn = { id: jokeDataObject.data.id, ...values };
      let joke = await Calls.Joke.update(dtoIn, props.baseUri);

      if (joke.categoryIdList.length) {
        const categoryList = await Calls.Category.list({ idList: joke.categoryIdList }, props.baseUri);
        joke.categoryList = categoryList.itemList;
      }

      joke.imageFile = values.image;
      joke.imageUrl = values.image && generateImageUrl(values.image);

      return joke;
    }

    async function handleAddRating(rating) {
      const dtoIn = { id: jokeDataObject.data.id, rating };
      const joke = await Calls.Joke.addRating(dtoIn, props.baseUri);
      return mergeJoke(joke);
    }

    async function handleUpdateVisibility(visibility) {
      const dtoIn = { id: jokeDataObject.data.id, visibility };
      const joke = await Calls.Joke.updateVisibility(dtoIn, props.baseUri);
      return mergeJoke(joke);
    }

    function mergeJoke(joke) {
      return (prevData) => {
        return { ...joke, imageFile: prevData.imageFile, imageUrl: prevData.imageUrl };
      };
    }

    function generateImageUrl(imageFile) {
      return URL.createObjectURL(imageFile);
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change of baseUri and id = no reload is required
        if (prevProps.baseUri === props.baseUri && prevProps.oid === props.oid) {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (jokeDataObject.state !== "ready") {
          return;
        }

        try {
          prevPropsRef.current = props;
          await jokeDataObject.handlerMap.load();
        } catch (error) {
          Provider.logger.error("Error while reloading data.", error);
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, jokeDataObject]);

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => URL.revokeObjectURL(jokeDataObject.data?.imageUrl);
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

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
