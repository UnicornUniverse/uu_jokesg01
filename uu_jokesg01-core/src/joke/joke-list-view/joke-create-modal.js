//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useLsiValues } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./joke-create-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeCreateModal",
  //@@viewOff:statics
};

export const JokeCreateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string,
    shown: UU5.PropTypes.bool,
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    baseUri: undefined,
    shown: false,
    onSave: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(Lsi);
    const imageRef = useRef();

    function handleSave(opt) {
      props.onSave(opt);
    }

    function validateText(opt) {
      let result = { feedback: "initial", value: opt.value };
      // when there is no event, validation comes from "isValid" method
      if (opt.event === undefined) {
        // text is empty, check file
        if (!opt.value && !imageRef.current.getValue()) {
          result.feedback = "error";
          result.message = <UU5.Bricks.Lsi lsi={Lsi.textOrFile} />;
          opt.component.setFeedback(result.feedback, result.message);
        }
      }
      return result;
    }

    function renderCategories() {
      return props.categoryList.map((category) => (
        <UU5.Forms.Select.Option value={category.id} key={category.id}>
          {category.name}
        </UU5.Forms.Select.Option>
      ));
    }
    //@@viewOff:private

    //@@viewOn:render
    const header = (
      <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
    );

    const footer = <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }} />;

    return (
      <UU5.Forms.ContextModal
        header={header}
        footer={footer}
        shown={props.shown}
        offsetTop="auto"
        location="portal"
        overflow
        onClose={props.onCancel}
      >
        <UU5.Forms.ContextForm
          onSave={handleSave}
          onSaveDone={() => {}}
          onSaveFail={() => {}}
          onCancel={props.onCancel}
        >
          <UU5.Forms.Text
            label={inputLsi.name}
            name="name"
            inputAttrs={{ maxLength: 255 }}
            controlled={false}
            required
          />

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select label={inputLsi.category} name="categoryList" controlled={false} multiple>
                {renderCategories()}
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.File ref_={imageRef} label={inputLsi.image} name="image" controlled={false} />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Forms.TextArea
            label={inputLsi.text}
            name="text"
            inputAttrs={{ maxLength: 4000 }}
            onValidate={validateText}
            controlled={false}
            autoResize
          />
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

export default JokeCreateModal;
