//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import Context from "./context";
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
  defaultProps: {
    baseUri: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokesDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        update: handleUpdate,
        setState: handleSetState,
      },
    });

    const prevPropsRef = useRef(props);

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change of baseUri = no reload is required
        if (prevProps.baseUri === props.baseUri) {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (!jokesDataObject.handlerMap.load) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await jokesDataObject.handlerMap.load();
        } catch (error) {
          console.error(error);
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, jokesDataObject]);

    async function handleLoad() {
      // ISSUE - groupCall doesn't support dtoIn equal to null or undefined.
      // SOLUTION - Empty object is sent and waiting for the fix
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60a253704da8010029445ca5

      const dtoOut = await Calls.Jokes.load({}, props.baseUri);
      return { ...dtoOut.data, territoryData: dtoOut.territoryData, sysData: dtoOut.sysData };
    }

    async function handleUpdate(values) {
      const dtoOut = await Calls.Jokes.update(values, props.baseUri);
      const data = { ...dtoOut.jokes, categoryList: jokesDataObject.data.categoryList };
      const territoryData = {
        ...jokesDataObject.data.territoryData,
        artifact: dtoOut.artifact,
        context: dtoOut.context,
      };
      const sysData = jokesDataObject.data.sysData;
      return { ...data, territoryData, sysData };
    }

    async function handleSetState(values) {
      const dtoOut = await Calls.Jokes.setState(values, props.baseUri);
      const data = { ...dtoOut.jokes, categoryList: jokesDataObject.data.categoryList };
      const territoryData = {
        ...jokesDataObject.data.territoryData,
        artifact: dtoOut.artifact,
        context: dtoOut.context,
      };
      const sysData = jokesDataObject.data.sysData;
      return { ...data, territoryData, sysData };
    }

    // There is only 1 atribute now but we are ready for future expansion
    const value = useMemo(() => {
      return { jokesDataObject };
    }, [jokesDataObject]);
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
