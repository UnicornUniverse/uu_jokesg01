//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useMemo, useSession } from "uu5g04-hooks";
import { useSystemData } from "uu_plus4u5g02";
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
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const { data: systemData } = useSystemData();

    const permission = useMemo(() => {
      const profileList = props.profileList || systemData?.profileData?.uuIdentityProfileList || [];
      const isAuthority = profileList.some((profile) => profile === "Authorities");
      const isExecutive = profileList.some((profile) => profile === "Executives");

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
    }, [props.profileList, systemData, identity]);
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
