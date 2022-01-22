//@@viewOn:imports
import UU5 from "uu5g04";
// FIXME MFA Migrate form
import { createVisualComponent, PropTypes, useRef, useLsiValues } from "uu5g05";
import { Error } from "../../core/core";
import PreventLeaveController from "../../core/prevent-leave-controller";
import Config from "./config/config";
import LsiData from "./update-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UpdateModal",
  //@@viewOff:statics
};

export const UpdateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array.isRequired,
    baseUri: PropTypes.string,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(LsiData);
    const imageRef = useRef();

    async function handleSave(opt) {
      const values = { ...opt.values };

      if (typeof values.image === "string") {
        delete values.image;
      }

      try {
        // The modal window remains opened during operation and shows possible errors
        // in local alertBus of the form (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done
        // and show some global success alert if needed.
        await props.jokeDataObject.handlerMap.update({ id: props.jokeDataObject.data.id, ...values });
        opt.component.saveDone();
      } catch (error) {
        console.error(error);
        opt.component.saveFail();
        opt.component.getAlertBus().addAlert({
          content: <Error errorData={error} />,
          colorSchema: "danger",
        });
      }
    }

    function validateText(opt) {
      let result = { feedback: "initial", value: opt.value };
      // when there is no event, validation comes from "isValid" method
      if (opt.event === undefined) {
        // text is empty, check file
        if (!opt.value && !imageRef.current.getValue()) {
          result.feedback = "error";
          result.message = <UU5.Bricks.Lsi lsi={LsiData.textOrFile} />;
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
    const joke = props.jokeDataObject.data;

    const header = (
      <UU5.Forms.ContextHeader
        content={<UU5.Bricks.Lsi lsi={LsiData.header} />}
        info={<UU5.Bricks.Lsi lsi={LsiData.info} />}
      />
    );

    const footer = (
      <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={LsiData.submit} /> }} />
    );

    // All form inputs MUST be set as uncontrolled to hold content during componen't update (React update).
    // For example, when there is error during server call everything from provider to this form is re-rendered
    // to have chance properly show error details and allow user to try it again.
    return (
      <PreventLeaveController onConfirmLeave={props.onCancel}>
        {({ handleInit, handleClose }) => (
          <UU5.Forms.ContextModal
            header={header}
            footer={footer}
            shown={props.shown}
            offsetTop="auto"
            location="portal"
            onClose={handleClose}
            controlled={false}
            overflow
          >
            <UU5.Forms.ContextForm
              onSave={handleSave}
              onSaveDone={() => props.onSaveDone()}
              onSaveFail={() => {}}
              onCancel={handleClose}
              onInit={handleInit}
            >
              <UU5.Forms.Text
                label={inputLsi.name}
                name="name"
                value={joke.name}
                inputAttrs={{ maxLength: 255 }}
                controlled={false}
                required
              />

              <UU5.Bricks.Row>
                <UU5.Bricks.Column colWidth="m-6">
                  <UU5.Forms.Select
                    label={inputLsi.category}
                    name="categoryList"
                    value={joke.categoryList}
                    controlled={false}
                    multiple
                  >
                    {renderCategories()}
                  </UU5.Forms.Select>
                </UU5.Bricks.Column>
                <UU5.Bricks.Column colWidth="m-6">
                  <UU5.Forms.File
                    ref_={imageRef}
                    label={inputLsi.image}
                    name="image"
                    value={joke.image}
                    controlled={false}
                  />
                </UU5.Bricks.Column>
              </UU5.Bricks.Row>

              <UU5.Forms.TextArea
                label={inputLsi.text}
                name="text"
                value={joke.text}
                inputAttrs={{ maxLength: 4000 }}
                onValidate={validateText}
                controlled={false}
                autoResize
              />
            </UU5.Forms.ContextForm>
          </UU5.Forms.ContextModal>
        )}
      </PreventLeaveController>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
