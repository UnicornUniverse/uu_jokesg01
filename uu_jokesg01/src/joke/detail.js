//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { Core, Joke } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./detail/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Detail",
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

export const Detail = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    jokeId: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    showCategories: UU5.PropTypes.bool,
    showAuthor: UU5.PropTypes.bool,
    showCreationTime: UU5.PropTypes.bool,
    disableUserPreference: UU5.PropTypes.bool,
    uu5Id: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCategories: true,
    showAuthor: true,
    showCreationTime: true,
    disableUserPreference: false,
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

        <Joke.Detail
          baseUri={this.props.baseUri}
          jokeId={this.props.jokeId}
          bgStyle={this.props.bgStyle}
          cardView={this.props.cardView}
          colorSchema={this.props.colorSchema}
          elevation={this.props.elevation}
          borderRadius={this.props.borderRadius}
          nestingLevel={this.props.nestingLevel}
          disabled={this.props.disabled}
          hidden={this.props.hidden}
          className={this.props.className}
          style={this.props.style}
          mainAttrs={this.props.mainAttrs}
          noIndex={this.props.noIndex}
          ref_={this.props.ref_}
          uu5Id={this.props.uu5Id}
          disableUserPreference={this.props.disableUserPreference}
          showCategories={this.props.showCategories}
          showAuthor={this.props.showAuthor}
          showCreationTime={this.props.showCreationTime}
          showCopyComponent
        />
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default Detail;
