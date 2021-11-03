//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useLsiValues } from "uu5g04-hooks";
import { Error } from "../../core/core";
import Config from "../config/config";
import Lsi from "./create-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CreateModal",
  //@@viewOff:statics
};

export const CreateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: UU5.PropTypes.object.isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string,
    shown: UU5.PropTypes.bool,
    onSaveDone: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
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
    const inputLsi = useLsiValues(Lsi);
    const imageRef = useRef();
    const formRef = useRef();
    const confirmModalRef = useRef();

    async function handleSave(opt) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // in local alertBus of the form (pessimistic approach). The parent component
        // is responsible to close modal window after operation has been successfuly done
        // and show some global success alert if needed.
        const joke = await props.jokeDataList.handlerMap.create(opt.values);
        opt.component.saveDone(joke);
      } catch (error) {
        console.error(error);
        opt.component.saveFail();
        opt.component.getAlertBus().addAlert({
          content: <Error errorData={error} />,
          colorSchema: "danger",
        });
      }
    }

    function handleCancel(opt) {
      handleConfirmClose(opt);
    }

    function handleClose() {
      const formOpt = { component: formRef.current };
      handleConfirmClose(formOpt);
    }

    const handleConfirmClose = (opt) => {
      const values = opt.component.getValues();
      let valuesChanged = false;
      for (const key in values) {
        if ((Array.isArray(values[key]) && values[key].length) || (!Array.isArray(values[key]) && values[key])) {
          valuesChanged = true;
        }
      }
      if (valuesChanged) {
        confirmModalRef.current.open({
          content: <CloseConfirmContent />,
          confirmButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmButton} />, colorSchema: "danger" },
          refuseButtonProps: { content: <UU5.Bricks.Lsi lsi={Lsi.closeModalRefuseButton} /> },
          onConfirm: props.onCancel,
        });
      } else {
        props.onCancel();
      }
    };

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

    // All form inputs MUST be set as uncontrolled to hold content during componen't update (React update).
    // For example, when there is error during server call everything from provider to this form is re-rendered
    // to have chance properly show error details and allow user to try it again.
    return (
      <>
        <UU5.Bricks.ConfirmModal ref_={confirmModalRef} size="auto" className="center" />
        <UU5.Forms.ContextModal
          header={header}
          footer={footer}
          shown={props.shown}
          offsetTop="auto"
          location="portal"
          overflow
          onClose={handleClose}
        >
          <UU5.Forms.ContextForm
            onSave={handleSave}
            onSaveDone={({ dtoOut }) => props.onSaveDone(dtoOut)}
            onSaveFail={() => {}}
            onCancel={handleCancel}
            ref={formRef}
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
      </>
    );
    //@@viewOff:render
  },
});

function CloseConfirmContent() {
  return (
    <>
      <UU5.Bricks.Header level="6">
        <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirmHeader} />
      </UU5.Bricks.Header>
      <UU5.Bricks.Lsi lsi={Lsi.closeModalConfirm} />
    </>
  );
}

export default CreateModal;
