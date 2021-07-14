//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import JokesPermissionContext from "./jokes-permission-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesPermissionProvider",
  //@@viewOff:statics
};

export const JokesPermissionProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    profileList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    profileList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();

    const permission = useMemo(() => {
      const isAuthority = props.profileList.some((profile) => profile === "Authorities");
      const isExecutive = props.profileList.some((profile) => profile === "Executives");

      function canCreate() {
        return isAuthority || isExecutive;
      }
      function isOwner(joke) {
        return identity?.uuIdentity === joke.uuIdentity;
      }

      // User can edit and delete joke
      function canManage(joke) {
        return isAuthority || (isExecutive && isOwner(joke));
      }

      function canAddRating(joke) {
        return !isOwner(joke);
      }

      function canUpdateVisibility() {
        return isAuthority;
      }

      const joke = {
        canCreate,
        canManage,
        canAddRating,
        canUpdateVisibility,
      };

      return {
        isAuthority,
        isExecutive,
        joke,
      };
    }, [props.profileList, identity]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokesPermissionContext.Provider value={permission}>
        {typeof props.children === "function" ? props.children(permission) : props.children}
      </JokesPermissionContext.Provider>
    );
    //@@viewOff:render
  },
});

export default JokesPermissionProvider;
