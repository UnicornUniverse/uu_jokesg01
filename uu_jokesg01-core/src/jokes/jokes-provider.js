//@@viewOn:imports
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import { useSubApp, useSubAppData, useSystemData, useTerritoryData } from "uu_plus4u5g02";
import Calls from "calls";
import Config from "./config/config";
import JokesContext from "./jokes-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesProvider",
  //@@viewOff:statics
};

export const JokesProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subApp = useSubApp();
    const subAppDataObj = useSubAppData();
    const systemDataObj = useSystemData();
    const territoryDataObj = useTerritoryData();

    const jokesDataObject = useDataObject({
      handlerMap: {
        get: handleGet,
        update: handleUpdate,
        setState: handleSetState,
      },
    });

    const prevSubAppDataRef = useRef(subAppDataObj);
    const prevTerritoryDataRef = useRef(territoryDataObj);

    useEffect(() => {
      async function checkDataAndGet() {
        const prevSubAppData = prevSubAppDataRef.current;
        const prevTerritoryData = prevTerritoryDataRef.current;

        if (prevSubAppData.data === subAppDataObj.data && prevTerritoryData.data === territoryDataObj.data) {
          return;
        }

        if (
          subAppDataObj.state !== "ready" ||
          territoryDataObj.state !== "ready" ||
          jokesDataObject.state === "pending"
        ) {
          return;
        }

        try {
          prevSubAppDataRef.current = subAppDataObj;
          prevTerritoryDataRef.current = territoryDataObj;
          await jokesDataObject.handlerMap.get();
        } catch (error) {
          console.error(error);
          prevSubAppDataRef.current = prevSubAppData;
          prevTerritoryDataRef.current = prevTerritoryData;
        }
      }

      checkDataAndGet();
    }, [subAppDataObj, territoryDataObj, jokesDataObject]);

    async function handleGet() {
      return {
        ...subAppDataObj.data,
        sysData: systemDataObj.data,
        territoryData: territoryDataObj.data,
      };
    }

    async function handleUpdate(values) {
      const dtoOut = await Calls.Jokes.update(values, subApp.baseUri);
      const jokes = await Calls.Jokes.load({}, subApp.baseUri);

      const newSubAppData = { ...subAppDataObj.data, name: dtoOut.name };
      const newTerritoryData = jokes.territoryData;

      subAppDataObj.handlerMap.setData(newSubAppData);
      territoryDataObj.handlerMap.setData(newTerritoryData);

      return { ...jokesDataObject.data, data: newSubAppData, territoryData: newTerritoryData };
    }

    async function handleSetState(values) {
      const dtoOut = await Calls.Jokes.update(values, subApp.baseUri);
      const jokes = await Calls.Jokes.load({}, subApp.baseUri);

      const newSubAppData = { ...subAppDataObj.data, state: dtoOut.state };
      const newTerritoryData = jokes.territoryData;

      subAppDataObj.handlerMap.setData(newSubAppData);
      territoryDataObj.handlerMap.setData(newTerritoryData);

      return { ...jokesDataObject.data, data: newSubAppData, territoryData: newTerritoryData };
    }

    // There is only 1 atribute now but we are ready for future expansion
    const value = useMemo(() => {
      return { jokesDataObject };
    }, [jokesDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </JokesContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokesProvider;
