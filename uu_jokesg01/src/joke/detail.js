//@@viewOn:imports
import UU5, { createVisualComponent } from "uu5g04";
import { Core, Joke, Utils } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./detail/edit-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  tagName: Config.TAG + "Detail",
  nestingLevelList: ["box", "inline"],
  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  baseUri: undefined,
  jokeId: undefined,
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
};

export const Detail = createVisualComponent({
  statics: STATICS,

  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.EditableMixin],
  //@@viewOff:mixins

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
    jokeId: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  //@@viewOn:overriding
  onBeforeForceEndEditation_() {
    return this._editRef ? this._editRef.current.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _editRef: UU5.Common.Reference.create(),

  _handleCopyComponent() {
    // TODO new Uu5String(tag, props).toString()
    return Utils.createCopyTag(STATICS.tagName, this.props, ["baseUri", "id"], DEFAULT_PROPS);
  },
  //@@viewOff:private

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:render
  render() {
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(this.props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(this.props);

    return (
      // TODO Consider to make ErrorBoundary as HoC
      // TODO We could create Edit HoC with parameters Joke.JokeDetail and EditModal
      <Core.ErrorBoundary nestingLevel={currentNestingLevel} {...attrs}>
        {this.isInlineEdited() && (
          <EditModal
            props={this.props}
            onClose={this.endEditation}
            ref={this._editRef}
            fallback={this.getEditingLoading()}
          />
        )}

        <Joke.JokeDetail
          baseUri={this.props.baseUri}
          jokeId={this.props.jokeId}
          bgStyle={this.props.bgStyle}
          cardView={this.props.cardView}
          colorSchema={this.props.colorSchema}
          elevation={this.props.elevation}
          borderRadius={this.props.borderRadius}
          nestingLevel={currentNestingLevel}
          onCopyComponent={this._handleCopyComponent}
          showCopyComponent
          {...attrs}
        />
      </Core.ErrorBoundary>
    );
  },
  //@@viewOff:render
});

export default Detail;
