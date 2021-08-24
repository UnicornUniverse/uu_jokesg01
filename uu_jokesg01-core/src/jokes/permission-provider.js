//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useSession } from "uu5g04-hooks";
import Config from "./config/config";
import PermissionContext from "./permission-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PermissionProvider",
  //@@viewOff:statics
};

export const PermissionProvider = createComponent({
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

      function isOwner(joke) {
        return identity?.uuIdentity === joke.uuIdentity;
      }

      const jokes = {
        canUpdate: () => isAuthority,
        canSetState: () => isAuthority,
      };

      const joke = {
        canCreate: () => isAuthority || isExecutive,
        canManage: (joke) => isAuthority || (isExecutive && isOwner(joke)),
        canAddRating: (joke) => !isOwner(joke),
        canUpdateVisibility: () => isAuthority,
      };

      const category = {
        canCreate: () => isAuthority || isExecutive,
        canManage: () => isAuthority || isExecutive,
      };

      return {
        jokes,
        joke,
        category,
      };
    }, [props.profileList, identity]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <PermissionContext.Provider value={permission}>
        {typeof props.children === "function" ? props.children(permission) : props.children}
      </PermissionContext.Provider>
    );
    //@@viewOff:render
  },
});

export default PermissionProvider;
