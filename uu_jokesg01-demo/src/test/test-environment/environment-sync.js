//@@viewOn:imports
import { createComponent, useLanguage, useEffect, PropTypes } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

const EnvironmentSync = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EnvironmentSync",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    environment: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setLanguage] = useLanguage();

    useEffect(() => {
      setLanguage(props.environment.language);
    }, [props.environment.language]);
    //@@viewOff:private

    //@@viewOn:render
    return null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EnvironmentSync };
export default EnvironmentSync;
//@@viewOff:exports
