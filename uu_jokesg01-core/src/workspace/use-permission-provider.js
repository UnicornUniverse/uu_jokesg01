//@@viewOn:imports
import { useMemo, useSession } from "uu5g05";
import { useSubApp, useAwscData } from "uu_plus4u5g02";
//@@viewOff:imports

function usePermissionProvider({ profileList: propProfileList, baseUri: propsBaseUri }) {
  const session = useSession();
  const subApp = useSubApp();
  const awsc = useAwscData();
  const baseUri = propsBaseUri ?? subApp.baseUri;

  const permission = useMemo(() => {
    let profileList;

    if (propProfileList) {
      profileList = propProfileList;
    } else if (session.state === "authenticated" && awsc.data?.data?.authorizationResult) {
      profileList = awsc.data.data.authorizationResult.userUuAppProfileList;
    } else {
      profileList = [];
    }

    const isAuthority = profileList.includes("Authorities");
    const isExecutive = profileList.includes("Executives");
    const isAwidLicenseOwner = profileList.includes("AwidLicenseOwner");

    function isOwner(joke) {
      return session.identity?.uuIdentity === joke.uuIdentity;
    }

    const workspace = {
      canUpdate: () => isAuthority,
      canSetState: () => isAuthority,
      canInit: () => isAwidLicenseOwner,
    };

    const joke = {
      canCreate: () => isAuthority || isExecutive,
      canManage: (joke) => isAuthority || (isExecutive && isOwner(joke)),
      canAddRating: (joke) => !isOwner(joke),
      canUpdateVisibility: () => isAuthority,
      canFilterVisibility: () => isAuthority || isExecutive,
    };

    const category = {
      canCreate: () => isAuthority || isExecutive,
      canManage: () => isAuthority || isExecutive,
    };

    return {
      workspace,
      joke,
      category,
      baseUri,
    };
  }, [propProfileList, awsc, session, baseUri]);

  return permission;
}

//@@viewOn:exports
export { usePermissionProvider };
export default usePermissionProvider;
//@@viewOff:exports
