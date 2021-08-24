//@@viewOn:imports
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import { useSubApp, useSubAppData, useSystemData, useTerritoryData } from "uu_plus4u5g02";
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
      initialData: getInitialData(),
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

    function getData() {
      return {
        ...subAppDataObj.data,
        sysData: systemDataObj.data,
        territoryData: territoryDataObj.data,
      };
    }

    function getInitialData() {
      if (subAppDataObj.state === "ready" && territoryDataObj.state === "ready") {
        return getData();
      } else {
        return undefined;
      }
    }

    async function handleGet() {
      return getData();
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
      <Context.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

export default Provider;
