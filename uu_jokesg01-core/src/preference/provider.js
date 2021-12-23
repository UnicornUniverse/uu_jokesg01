//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import { usePerson } from "uu_plus4u5g02";
import Config from "./config/config";
import Context from "./context";
import Errors from "./errors";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Provider",
  //@@viewOff:statics
};

export const Provider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    uu5Tag: UU5.PropTypes.string.isRequired,
    uu5Id: UU5.PropTypes.string,
    defaultData: UU5.PropTypes.object,
    scope: UU5.PropTypes.string,
    skipInitialLoad: UU5.PropTypes.bool,
    disableUserPreference: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    defaultData: {},
    scope: "uuAppWorkspace",
    skipInitialLoad: false,
    disableUserPreference: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const prevPropsRef = useRef({}); // There are no previous properties during first render
    const personDataObject = usePerson(); // We need to know persons' uuMt baseUri to load user preference
    const isUserPreference = getIsUserPreference();
    const isPersonReady = personDataObject.state === "ready";

    const preferenceDataObject = useDataObject({
      initialData: !isUserPreference ? getPreference() : null, // Skips initial loading and sets state "ready"
      skipInitialLoad: props.skipInitialLoad || !isPersonReady, // We can't load preference without persons' uuMt baseUri
      handlerMap: {
        load: handleLoad,
        save: handleSave,
      },
    });

    async function handleLoad() {
      // User preference is disabled? Just return default one.
      if (!isUserPreference) {
        return getPreference();
      }

      // User preference is allowed but no uu5Id? No chance. How to save it?
      if (isUserPreference && !props.uu5Id) {
        throw new Errors.NoUu5IdError();
      }

      try {
        const preferenceCode = getPreferenceCode();
        const dtoIn = {
          mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
          codeList: [preferenceCode],
        };
        const dtoOut = await Calls.Preference.loadFirst(dtoIn, props.baseUri);
        // There probably is no user preferece and getPreference returns default one.
        return getPreference(dtoOut.data?.data);
      } catch (error) {
        // User Preference is nice-to-have behaviour. The component MUST be able
        // to work without loaded preference and use the default values.
        console.error(error);
        return getPreference();
      }
    }

    async function handleSave(values) {
      // The view shouldn't allow to call this function when user preference is disabled.
      // But if user somehow run the action the provider returns default preference.
      if (!isUserPreference) {
        return getPreference();
      }

      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        code: getPreferenceCode(),
        scope: props.scope,
        data: values,
      };

      const dtoOut = await Calls.Preference.createOrUpdate(dtoIn, props.baseUri);
      // The stored values are merged with local-only preferences (e.g. disableUserPreference)
      return getPreference(dtoOut.data.data);
    }

    /**
     * Generates user preference code as composition of uu5Tag + uu5Id
     * @returns User preference code
     */
    function getPreferenceCode() {
      const prefix = props.uu5Tag.replaceAll(".", "");
      // The max allowed length of code accepted by MyTerritory is 96 characters!
      return `${prefix}_${props.uu5Id}`;
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
        !props.disableUserPreference &&
        Object.prototype.hasOwnProperty.call(personDataObject, "state") &&
        personDataObject.state !== "readyNoData"
      );
    }

    /**
     * Compose preference from default data, user preference and local-only preference (e.g. disableUserPreference).
     * Mentioned order is by priority from the lowest to the highest (local always win).
     * @returns Final preference that should be used in views
     */
    function getPreference(userPreference) {
      return { ...props.defaultData, ...userPreference, disableUserPreference: !isUserPreference };
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change of props = no reload is required
        if (
          prevProps.baseUri === props.baseUri &&
          prevProps.uu5Id === props.uu5Id &&
          prevProps.scope === props.scope &&
          prevProps.disableUserPreference === props.disableUserPreference
        ) {
          return;
        }

        if (
          !isPersonReady ||
          preferenceDataObject.state === "pending" ||
          preferenceDataObject.state === "pendingNoData" ||
          preferenceDataObject.state === "errorNoData"
        ) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await preferenceDataObject.handlerMap.load();
        } catch (error) {
          console.error(error);
          prevPropsRef.current = prevProps;
        }
      }

      checkPropsAndReload();
    }, [props, preferenceDataObject, isPersonReady]);

    // There is only 1 atribute now but we are ready for future expansion
    // HINT: Data are wrapped by object for future expansion of values with backward compatibility
    const value = useMemo(() => {
      return { preferenceDataObject };
    }, [preferenceDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Context.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </Context.Provider>
    );
    //@@viewOff:render
  },
});

export default Provider;
