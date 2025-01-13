//@@viewOn:imports
import { useDataObject, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Calls from "calls";
//@@viewOff:imports

function useProvider({ baseUri, oid, skipInitialLoad = false }) {
  const subApp = useSubApp();
  baseUri = baseUri ?? subApp.baseUri;

  const canLoad = baseUri && oid ? true : false;

  const categoryDto = useDataObject(
    {
      skipInitialLoad: canLoad ? skipInitialLoad : false,
      handlerMap: {
        load: canLoad ? handleLoad : undefined,
      },
    },
    [baseUri, oid],
  );

  function handleLoad() {
    return Calls.Category.get(baseUri, { id: oid });
  }

  const value = useMemo(
    () => ({
      categoryDto,
      baseUri,
      oid,
    }),
    [categoryDto, baseUri, oid],
  );

  return value;
}

//@@viewOn:exports
export { useProvider };
export default useProvider;
//@@viewOff:exports
