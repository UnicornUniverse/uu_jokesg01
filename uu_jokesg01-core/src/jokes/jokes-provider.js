//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import JokesContext from "./jokes-context";
import Errors from "./jokes-provider-errors";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesProvider",
  //@@viewOff:statics
};

export const JokesProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
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
      },
    });

    useEffect(() => {
      if (jokesDataObject.state === "pendingNoData" || jokesDataObject.state === "pending") {
        return;
      }

      jokesDataObject.handlerMap.load().catch((error) => console.error(error));
    }, [props.baseUri]);

    function handleLoad() {
      if (!props.baseUri) {
        throw new Errors.NoBaseUriError();
      }

      // ISSUE - groupCall doesn't support dtoIn equal to null or undefined.
      // SOLUTION - Empty object is sent and waiting for the fix
      // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60a253704da8010029445ca5
      return Calls.Jokes.load(props.baseUri, {});
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesContext.Provider value={jokesDataObject}>
        {typeof props.children === "function" ? props.children(jokesDataObject) : props.children}
      </JokesContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokesProvider;
