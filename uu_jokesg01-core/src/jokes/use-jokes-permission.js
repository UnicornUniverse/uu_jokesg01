//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./jokes-permission-context";
//@@viewOff:imports

export function useJokesPermission() {
  return useContext(Context);
}

export default useJokesPermission;
