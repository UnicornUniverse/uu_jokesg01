//@@viewOn:imports
import { createComponent, PropTypes, useDataObject, useEffect, useRef, useMemo } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:helpers
function generateImageUrl(imageFile) {
  return URL.createObjectURL(imageFile);
}
//@@viewOff:helpers

export const ImageProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    code: PropTypes.string,
    baseUri: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const imageDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    const prevPropsRef = useRef(props);

    async function handleLoad() {
      if (!props.code) {
        return {};
      }

      const dtoIn = { code: props.code };
      const file = await Calls.Joke.getImage(dtoIn, props.baseUri);
      const url = generateImageUrl(file);
      return { code: props.code, file, url };
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        if (prevProps.baseUri === props.baseUri && prevPropsRef.current.code === props.code) {
          return;
        }

        if (!imageDataObject.handlerMap.load) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await imageDataObject.handlerMap.load();
        } catch (error) {
          ImageProvider.logger.error("Error while reloading data.", error);
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, imageDataObject]);

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => URL.revokeObjectURL(imageDataObject.data?.url);
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    const value = useMemo(() => {
      return { imageDataObject };
    }, [imageDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export default ImageProvider;
//@@viewOff:exports
