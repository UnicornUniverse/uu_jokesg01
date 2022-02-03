//@@viewOn:imports
import { createComponent, PropTypes, useMemo } from "uu5g05";
import { AppWorkspaceProvider } from "uu_plus4u5g02";
import Calls from "calls";
import Config from "./config/config";
//@@viewOff:imports

export const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const handlerMap = useMemo(() => {
      async function handleLoad() {
        return await Calls.Jokes.load({}, props.baseUri);
      }

      async function handleUpdate(values) {
        const dtoOut = await Calls.Jokes.update(values, props.baseUri);
        return mergeDtoOut(dtoOut);
      }

      async function handleSetState(values) {
        const dtoOut = await Calls.Jokes.setState(values, props.baseUri);
        return mergeDtoOut(dtoOut);
      }

      async function handleInit(values) {
        const dtoOut = await Calls.Jokes.init(values, props.baseUri);
        return mergeDtoOut(dtoOut);
      }

      function mergeDtoOut(dtoOut) {
        return (prevData) => {
          const data = {
            data: {
              ...prevData.data.categoryList,
              ...dtoOut.jokes,
            },
            // The uuJokes should work without uuBT for educational purposes
            territoryData: prevData.territoryData && {
              ...prevData.territoryData,
              artifact: dtoOut.artifact,
              context: dtoOut.context,
            },
          };

          return data;
        };
      }

      return { load: handleLoad, update: handleUpdate, setState: handleSetState, init: handleInit };
    }, [props.baseUri]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <AppWorkspaceProvider subApp="uu-jokes-maing01" baseUri={props.baseUri} handlerMap={handlerMap}>
        {(value) => {
          return typeof props.children === "function" ? props.children(value) : props.children;
        }}
      </AppWorkspaceProvider>
    );
    //@@viewOff:render
  },
});

export default Provider;
