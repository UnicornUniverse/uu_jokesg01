//@@viewOn:imports
import { useDataObject, Utils } from "uu5g05";
import { usePerson, useSubApp } from "uu_plus4u5g02";
import Calls from "calls";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:helpers
const logger = Utils.LoggerFactory.get(Config.TAG + ".useProvider");

/**
 * Generates user preference code as composition of uu5Tag + uu5Id
 * @returns User preference code
 */
function getPreferenceCode(uu5Tag, uu5Id) {
  const code = uu5Tag.replaceAll(".", "");

  if (uu5Id) {
    return `${code}_${uu5Id}`;
  } else {
    return code;
  }
}
//@@viewOff:helpers

function useProvider({
  uu5Tag,
  uu5Id,
  baseUri: propsBaseUri,
  skipInitialLoad = false,
  defaultValue = {},
  scope = "uuAppWorkspace",
  disableUserPreference = false,
}) {
  const subApp = useSubApp();
  const personDto = usePerson();

  const baseUri = propsBaseUri ?? subApp.baseUri;
  const code = getPreferenceCode(uu5Tag, uu5Id);
  const mtMainBaseUri = personDto.data?.systemProfileSettings.uuMyTerritoryMainBaseUri;
  const canLoad = personDto.state === "ready";
  const isUserPreference = getIsUserPreference();

  const preferenceDto = useDataObject(
    {
      initialData: !isUserPreference ? getPreference() : null, // Skips initial loading and sets state "ready"
      skipInitialLoad: canLoad ? skipInitialLoad : false,
      handlerMap: {
        load: canLoad ? handleLoad : undefined,
        update: handleUpdate,
      },
    },
    [baseUri, personDto, code],
  );

  async function handleLoad() {
    // User preference is disabled? Just return default one.
    if (!isUserPreference) {
      return getPreference();
    }

    const dtoIn = { mtMainBaseUri, codeList: [code] };

    try {
      const dtoOut = await Calls.Preference.loadFirst(baseUri, dtoIn);
      return getPreference(dtoOut.data?.data);
    } catch (error) {
      // User Preference is nice-to-have behaviour. The component MUST be able
      // to work without loaded preference and use the default values.
      logger.warn("Error loading user preference. The default value is used as fallback.", error);
      return getPreference();
    }
  }

  async function handleUpdate(values) {
    // The view shouldn't allow to call this function when user preference is disabled.
    // But if user somehow run the action the provider returns default preference.
    if (!isUserPreference) {
      return getPreference();
    }

    const dtoIn = { mtMainBaseUri, code, scope, data: { ...preferenceDto.data, ...values } };
    const dtoOut = await Calls.Preference.createOrUpdate(baseUri, dtoIn);
    return dtoOut.data?.data;
  }

  /**
   * Compose preference from default value, user preference and local-only preference (e.g. disableUserPreference).
   * Mentioned order is by priority from the lowest to the highest (local always win).
   * @returns Final preference that should be used in views
   */
  function getPreference(userPreference) {
    return { ...defaultValue, ...userPreference };
  }

  /**
   * Checks if default configuration can be overriden by the users
   * @returns Returns true when it is allowed users to change default configuration and
   * person data have been successfully loaded. Otherwise returns false.
   */
  function getIsUserPreference() {
    // If there is no PersonProvider the personDataObject is empty object
    // If there is PersonProvider but no SessionProvider the presonDataObject.state is readyNoData
    return (
      !disableUserPreference &&
      Object.prototype.hasOwnProperty.call(personDto, "state") &&
      personDto.state !== "readyNoData"
    );
  }

  return { preferenceDto, baseUri, uu5Tag, uu5Id };
}

//@@viewOn:exports
export { useProvider };
export default useProvider;
//@@viewOff:exports
