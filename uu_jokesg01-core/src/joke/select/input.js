//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import WorkspaceProvider from "../../workspace/provider.js";
import ListProvider from "../list-provider.js";
import View from "./view";
import Joke from "../../utils/joke.js";
import Config from "./config/config.js";
//@@viewOff:imports

const Input = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Input",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ baseUri, ...viewProps }) {
    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <ListProvider
          sorterList={[{ key: Joke.Sorter.Keys.NAME, ascending: true }]}
          pageSize={1000 /* Joke's maxNoi is 1000 */}
        >
          <View {...viewProps} />
        </ListProvider>
      </WorkspaceProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Input };
export default Input;
//@@viewOff:exports
