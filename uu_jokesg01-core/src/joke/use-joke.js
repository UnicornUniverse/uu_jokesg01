//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./joke-context";
//@@viewOff:imports

export function useJoke() {
  return useContext(Context);
}

export default useJoke;
