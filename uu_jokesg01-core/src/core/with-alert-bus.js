//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { AlertBus } from "uu5g05-elements";
//@@viewOff:imports

export function withAlertBus(Component) {
  return createVisualComponent({
    //@@viewOn:statics
    uu5Tag: `withAlertBus(${Component.uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: { ...Component.defaultProps },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      //@@viewOff:private

      //@@viewOn:render
      return (
        <AlertBus>
          <Component {...props} />
        </AlertBus>
      );
      //@@viewOff:render
    },
  });
}

export default withAlertBus;
