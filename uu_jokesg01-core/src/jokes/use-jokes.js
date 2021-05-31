//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./jokes-context";
//@@viewOff:imports

export function useJokes() {
  return useContext(Context);
}

export default useJokes;
