//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import Config from "./config/config";
import { Error } from "../../core/core";
import Lsi from "./update-modal-lsi";
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
    categoryDataObject: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryDataObject: undefined,
    shown: false,
    onSave: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(Lsi);
    async function handleSave(opt) {
      const values = { ...opt.values };
      try {
        await props.categoryDataObject.handlerMap.update({ id: props.categoryDataObject.data.id, ...values });
        opt.component.saveDone();
        props.onSave(props.categoryDataObject);
      } catch (error) {
        console.error(error);
        opt.component.saveFail();
        opt.component.getAlertBus().addAlert({
          content: <Error errorData={error} />,
          colorSchema: "danger",
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const category = props.categoryDataObject.data;
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
            value={category.name}
            inputAttrs={{ maxLength: 255 }}
            controlled={false}
            required
          />
          <UU5.Forms.IconPicker label={inputLsi.icon} value={category.icon} size="m" name="icon" controlled={false} />
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

export default UpdateModal;
