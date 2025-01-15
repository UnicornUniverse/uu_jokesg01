//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi, Lsi } from "uu5g05";
import { Form, SubmitButton, CancelButton } from "uu5g05-forms";
import { FormRating } from "uu5extrasg01-forms";
import { Modal } from "uu5g05-elements";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const RateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RateModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    onSubmitted: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    open: false,
  },
  //@@viewOff:defaultProps

  render({ open, onSubmit, onSubmitted, onCancel, ...propsToPass }) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [RateModal.uu5Tag]);
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

    function handleSubmit(event) {
      const value = event.data.value.rating;
      const newEvent = new Utils.Event({ value }, event);
      return onSubmit(newEvent);
    }

    //@@viewOff:private

    //@@viewOn:render

    const formControls = (
      <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
        <CancelButton onClick={onCancel}>{lsi.cancel}</CancelButton>
        <SubmitButton icon="uugds-check">{lsi.submit}</SubmitButton>
      </div>
    );

    return (
      <Form.Provider onSubmit={handleSubmit} onSubmitted={onSubmitted}>
        <Modal
          {...elementProps}
          header={lsi.header}
          info={<Lsi lsi={lsi.info} />}
          footer={formControls}
          onClose={onCancel}
          open={open}
        >
          <Form.View gridLayout="rating">
            <FormRating name="rating" size="xl" autoFocus />
          </Form.View>
        </Modal>
      </Form.Provider>
    );
    //@@viewOff:render
  },
});

export default RateModal;
