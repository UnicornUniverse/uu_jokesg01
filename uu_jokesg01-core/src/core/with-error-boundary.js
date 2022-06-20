import Uu5, { createVisualComponent, Utils } from "uu5g05";
import { UnexpectedError } from "uu_plus4u5g02-elements";

function withErrorBoundary(Component, { statics = {} }) {
  return createVisualComponent({
    //@@viewOn:statics
    ...statics,
    uu5Tag: `withErrorBoundary(${Component.uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: { ...Component.defaultProps },
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      function Error({ error }) {
        const [elementProps] = Utils.VisualComponent.splitProps(props);
        return <UnexpectedError {...elementProps} error={error} nestingLevel={props.nestingLevel} />;
      }

      return (
        <Uu5.ErrorBoundary fallback={Error}>
          <Component {...props} />
        </Uu5.ErrorBoundary>
      );
    },
    //@@viewOff:render
  });
}

//@@viewOn:exports
export { withErrorBoundary };
export default withErrorBoundary;
//@@viewOff:exports
