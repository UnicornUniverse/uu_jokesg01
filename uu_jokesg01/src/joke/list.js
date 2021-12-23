//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
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

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    return (
      <Core.ErrorBoundary
        nestingLevel={this.props.nestingLevel}
        disabled={this.props.disabled}
        hidden={this.props.hidden}
        className={this.props.className}
        style={this.props.style}
        mainAttrs={this.props.mainAttrs}
        noIndex={this.props.noIndex}
        ref_={this.props.ref_}
      >
        {this.isInlineEdited() && (
          <EditModal
            props={this.props}
            onClose={this.endEditation}
            ref={this._editRef}
            fallback={this.getEditingLoading()}
          />
        )}

        <Joke.List
          baseUri={this.props.baseUri}
          rowCount={this.props.rowCount}
          bgStyle={this.props.bgStyle}
          cardView={this.props.cardView}
          colorSchema={this.props.colorSchema}
          elevation={this.props.elevation}
          borderRadius={this.props.borderRadius}
          contextType={this.props.contextType}
          nestingLevel={this.props.nestingLevel}
          disabled={this.props.disabled}
          hidden={this.props.hidden}
          className={this.props.className}
          style={this.props.style}
          mainAttrs={this.props.mainAttrs}
          noIndex={this.props.noIndex}
          ref_={this.props.ref_}
          showCopyComponent
        />
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default List;
