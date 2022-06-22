//@@viewOn:imports
import { createVisualComponent, Lsi, Utils } from "uu5g05";
import Config from "./config/config";
import LsiData from "./edit-modal-lazy-lsi";
const { EditModal } = Utils.Uu5Loader.get("uu5g05-editing");
const { FormSwitchSelect } = Utils.Uu5Loader.get("uu5g05-forms");
//@@viewOff:imports

const EditModalLazy = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModalLazy",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    // ISSUE EditMode - onReady is undefined
    // https://uuapp.plus4u.net/uu-sls-maing01/1719f390d5264e7b802d48c7d8525428/issueDetail?id=62aa290b53f08d002a465d4e
    //useEffect(() => props.onReady(), [props]);

    // ISSUE EditModal - nelze nastavit info pro každý tab
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62aa21d153f08d002a465aa6

    // ISSUE EditModal - nelze vložit custom komponentu
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62aa23ad53f08d002a465b1a

    const tabList = [
      {
        label: LsiData.properties,
        layout: {
          xs: "baseUri",
        },
      },
      {
        template: "visual",
        layout: {
          xs: `
            identificationType identificationType,
            nestingLevel nestingLevel,
            card card,
            borderRadius borderRadius
          `,
        },
        columns: "1fr 1fr",
      },
      {
        label: LsiData.advancedConfiguration,
        layout: {
          xs: `level`,
        },
      },
    ];

    const propInputMap = {
      baseUri: {
        props: {
          label: LsiData.baseUri,
          required: true,
        },
      },
      nestingLevel: {
        props: {
          valueList: ["area", "inline"],
        },
      },
      level: {
        component: FormSwitchSelect,
        props: ({ componentProps }) => {
          return {
            label: LsiData.level,
            itemList: [
              { children: "auto", value: undefined },
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
            disabled: componentProps.card === "full",
          };
        },
      },
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <EditModal
        uu5Tag={props.componentType.uu5Tag}
        header={<Lsi lsi={LsiData.header} />}
        props={props.componentProps}
        tabList={tabList}
        propInputMap={propInputMap}
        onSave={props.onSave}
        onClose={props.onClose}
        open
      />
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export { EditModalLazy };
export default EditModalLazy;
//viewOff:exports
