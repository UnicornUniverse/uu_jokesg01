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
    code: UU5.PropTypes.string,
    initialData: UU5.PropTypes.object,
    scope: UU5.PropTypes.string,
    skipInitialLoad: UU5.PropTypes.bool,
    disableUserPreference: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    initialData: {},
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
    const defaultPreference = getPreference();
    const isPersonReady = personDataObject.state === "ready";

    const preferenceDataObject = useDataObject({
      initialData: !isUserPreference ? defaultPreference : null, // Skips initial loading and sets state "ready"
      skipInitialLoad: props.skipInitialLoad || !isPersonReady, // We can't load preference without persons' uuMt baseUri
      handlerMap: {
        load: handleLoad,
        save: handleSave,
      },
    });

    async function handleLoad() {
      if (!isUserPreference) {
        return defaultPreference;
      }

      if (isUserPreference && !props.code) {
        throw new Errors.NoUserPreferenceCodeError();
      }

      try {
        const preferenceCode = getPreferenceCode();
        const dtoIn = {
          mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
          codeList: [preferenceCode],
        };
        const dtoOut = await Calls.Preference.loadFirst(dtoIn, props.baseUri);
        return getPreference(dtoOut?.data?.data);
      } catch (error) {
        // User Preference is nice-to-have behaviour. The component MUST be able
        // to work without loaded preference and use the default values .
        console.error(error);
        return defaultPreference;
      }
    }

    async function handleSave(values) {
      if (!isUserPreference) {
        return defaultPreference;
      }

      const dtoIn = {
        mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
        code: getPreferenceCode(),
        scope: props.scope,
        data: values,
      };

      const dtoOut = await Calls.Preference.createOrUpdate(dtoIn, props.baseUri);
      return dtoOut.data.data;
    }

    function getPreferenceCode() {
      const prefix = props.uu5Tag.replaceAll(".", "");
      return `${prefix}_${props.code}`;
    }

    function getIsUserPreference() {
      // If there is no PersonProvider the personDataObject is empty object
      // If there is PersonProvider but no SessionProvider the presonDataObject.state is readyNoData
      return (
        !props.disableUserPreference &&
        Object.prototype.hasOwnProperty.call(personDataObject, "state") &&
        personDataObject.state !== "readyNoData"
      );
    }

    function getPreference(userPreference) {
      return { ...props.initialData, ...userPreference, disableUserPreference: !isUserPreference };
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        const prevProps = prevPropsRef.current;

        // No change of props = no reload is required
        if (
          prevProps.baseUri === props.baseUri &&
          prevProps.code === props.code &&
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
