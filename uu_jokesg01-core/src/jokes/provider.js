//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo } from "uu5g04-hooks";
import { AppWorkspaceProvider } from "uu_plus4u5g02";
import Calls from "calls";
import Config from "./config/config";
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

      return { load: handleLoad, update: handleUpdate, setState: handleSetState };
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
