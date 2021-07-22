//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import { Error } from "../../core/core";
import Config from "../config/config";
import Lsi from "./category-create-modal-lsi";
//@@viewOff:imports

// TODO LACO Creation of joke is successful but some error is shown otherwise.

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryCreateModal",
  //@@viewOff:statics
};

export const CategoryCreateModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryDataList: UU5.PropTypes.object.isRequired,
    shown: UU5.PropTypes.bool,
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryDataList: undefined,
    shown: false,
    onSave: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(Lsi);

    async function handleSave(opt) {
      try {
        const category = await props.categoryDataList.handlerMap.create(opt.values);
        opt.component.saveDone();
        props.onSave(category);
      } catch (error) {
        debugger;
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
          <UU5.Forms.IconPicker label={inputLsi.icon} size="l" name="icon" controlled={false} />
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextModal>
    );
    //@@viewOff:render
  },
});

export default CategoryCreateModal;
