//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { Utils } from "uu5g05";
import { Core, Joke } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./list/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "List",
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

export const List = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  // ISSUE uu5g05 - Not compatible with uuEcc g02 edit mode
  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ec05ac572961002969f5b4
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    rowCount: 2,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    contextType: "basic",
  },
  //@@viewOff:defaultProps

  //@@viewOn:overriding
  onBeforeForceEndEditation_() {
    return this._editRef ? this._editRef.current.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _editRef: UU5.Common.Reference.create(),
  //@@viewOff:private

  //@@viewOn:render
  render() {
    // ISSUE Utils.VisualComponent.splitProps - Should add noPrint between standard properties
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61efec6957296100296aed65
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(this.props);

    return (
      <Core.ErrorBoundary {...elementProps} nestingLevel={this.props.nestingLevel}>
        <Joke.List {...elementProps} {...otherProps} />
        {this.isInlineEdited() && (
          <EditModal
            props={this.props}
            onClose={this.endEditation}
            ref={this._editRef}
            fallback={this.getEditingLoading()}
          />
        )}
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default List;
