//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { Utils } from "uu5g05";
import { AlertBus } from "uu5g05-elements";
import { Core, Joke } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./list/edit-modal";
//@@viewOff:imports

let defaultProps = { ...Joke.List.defaultProps };
defaultProps.rowCount = 2; // Brick has limited row count by default

// BaseMixin has own properties with same name + purpose and merging would end by exception :-(
delete defaultProps.id;
delete defaultProps.className;
delete defaultProps.style;
delete defaultProps.noIndex;

export const List = createVisualComponent({
  //@@viewOn:statics
  tagName: Config.TAG + "List",
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics

  //@@viewOn:mixins
  // ISSUE uu5g05 - Not compatible with uuEcc g02 edit mode
  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ec05ac572961002969f5b4
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: { ...Joke.List.propTypes },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps,
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

    // ISSUE Uu5g05 - Missing utility to convert margin property to CSS class
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6213b1f8572961002975d2ce
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(this.props);

    return (
      <Core.ErrorBoundary {...elementProps} nestingLevel={this.props.nestingLevel}>
        <AlertBus>
          <Joke.List {...elementProps} {...otherProps} />
          {this.isInlineEdited() && (
            <EditModal
              props={this.props}
              onClose={this.endEditation}
              ref={this._editRef}
              fallback={this.getEditingLoading()}
            />
          )}
        </AlertBus>
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default List;
