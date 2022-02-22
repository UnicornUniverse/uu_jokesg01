//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import { Core } from "uu_jokesg01-core";
import Config from "./config/config.js";
import PropertyForm from "./property-tester/property-form.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: ({ spaceA }) =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: "[left] 70% [right] 30%",
      columnGap: spaceA,
    }),
  form: () =>
    Config.Css.css({
      padding: 0,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PropertyTester = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PropertyTester",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const [properties, setProperties] = useState({});

    function handleSubmit(properties) {
      setProperties(properties);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(spacing));
    const { component: Component, componentProps } = props;

    return (
      <div {...attrs}>
        <Core.ErrorBoundary>
          <Component {...componentProps} {...properties} />
        </Core.ErrorBoundary>
        <PropertyForm componentProps={componentProps} onSubmit={handleSubmit} />
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PropertyTester };
export default PropertyTester;
//@@viewOff:exports
