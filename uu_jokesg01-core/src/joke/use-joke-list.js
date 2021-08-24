//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./list-context";
//@@viewOff:imports

export function useJokeList() {
  return useContext(Context);
}

export default useJokeList;
