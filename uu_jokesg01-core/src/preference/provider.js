//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject, useEffect, useRef, useMemo } from "uu5g04-hooks";
import { usePerson } from "uu_plus4u5g02";
import Config from "./config/config";
import Context from "./context";
import { NoUserPreferenceCodeError } from "./errors";
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
    const preferenceDataObject = useDataObject({
      initialData: props.disableUserPreference ? props.initialData : null,
      skipInitialLoad: props.skipInitialLoad || personDataObject.state !== "ready",
      handlerMap: {
        load: handleLoad,
        save: handleSave,
      },
    });

    const personDataObject = usePerson();

    const prevPropsRef = useRef(props.skipInitialLoad || personDataObject.state !== "ready" ? {} : props);

    function getPreferenceCode() {
      const prefix = props.uu5Tag.replaceAll(".", "");
      return `${prefix}_${props.code}`;
    }

    async function handleLoad() {
      if (props.disableUserPreference) {
        return { ...props.initialData, disableUserPreference: props.disableUserPreference };
      }

      if (!props.disableUserPreference && !props.code) {
        throw new NoUserPreferenceCodeError();
      }

      try {
        const preferenceCode = getPreferenceCode();
        const dtoIn = {
          mtMainBaseUri: personDataObject.data.systemProfileSettings.uuMyTerritoryMainBaseUri,
          codeList: [preferenceCode],
        };
        const dtoOut = await Calls.Preference.loadFirst(dtoIn, props.baseUri);
        return dtoOut?.data?.data || props.initialData;
      } catch (error) {
        // User Preference is nice-to-have behaviour. The component MUST be able
        // to work without loaded preference and use the default values (i.e. initialData).
        console.error(error);
        return preferenceDataObject.data || props.initialData;
      }
    }

    async function handleSave(values) {
      if (props.disableUserPreference) {
        return props.initialData;
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

        if (personDataObject.state !== "ready") {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (preferenceDataObject.state === "pending" || preferenceDataObject.state === "pendingNoData") {
          return;
        }

        if (preferenceDataObject.state === "errorNoData") {
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
    }, [props, preferenceDataObject, personDataObject]);

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
