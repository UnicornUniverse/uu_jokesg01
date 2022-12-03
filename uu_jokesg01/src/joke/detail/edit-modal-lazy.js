//@@viewOn:imports
import { createVisualComponent, Utils, useEffect, useLsi } from "uu5g05";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
const { EditModal } = Utils.Uu5Loader.get("uu5g05-editing");
const { FormText, FormCheckbox, FormSwitchSelect } = Utils.Uu5Loader.get("uu5g05-forms");
//@@viewOff:imports

const EditModalLazy = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModalLazy",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [EditModalLazy.uu5Tag]);
    useEffect(() => props.onReady(), [props]);

    // ISSUE EditModal - nelze vložit separátor
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62aa211053f08d002a465a4f

    // ISSUE EditModal - nelze nastavit info pro každý tab
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62aa21d153f08d002a465aa6

    // ISSUE EditModal - nelze vložit custom komponentu
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62aa23ad53f08d002a465b1a

    const tabList = [
      {
        label: lsi.properties,
        layout: {
          xs: "baseUri, oid",
        },
      },
      {
        label: lsi.configuration,
        layout: {
          xs: "showCategories, showAuthor, showCreationTime, .,disableUserPreference",
        },
      },
      {
        template: "visual",
        layout: {
          xs: `
            identificationType identificationType,
            nestingLevel nestingLevel,
            card card,
            significance significance,
            borderRadius borderRadius,
            aspectRatio aspectRatio,
            width height
          `,
        },
        columns: "1fr 1fr",
      },
      {
        label: lsi.advancedConfiguration,
        layout: {
          xs: `level`,
        },
      },
    ];

    const propInputMap = {
      baseUri: {
        props: {
          label: lsi.baseUri,
          required: true,
        },
      },
      oid: {
        component: FormText,
        props: {
          label: lsi.oid,
          required: true,
        },
      },
      showCategories: {
        component: FormCheckbox,
        props: {
          label: lsi.showCategories,
        },
      },
      showAuthor: {
        component: FormCheckbox,
        props: {
          label: lsi.showAuthor,
        },
      },
      showCreationTime: {
        component: FormCheckbox,
        props: {
          label: lsi.showCreationTime,
        },
      },
      disableUserPreference: {
        component: FormCheckbox,
        props: {
          label: lsi.disableUserPreference,
        },
      },
      nestingLevel: {
        props: {
          valueList: ["area", "box", "spot", "inline"],
        },
      },
      aspectRatio: {
        props: {
          valueList: ["1:1", "2:1", "2:3", "3:1", "3:2", "3:4", "4:3", "4:5", "5:4", "16:9", "16:10"],
        },
      },
      level: {
        component: FormSwitchSelect,
        props: ({ componentProps }) => {
          return {
            label: lsi.level,
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

    // ISSUE EditModal - aspectRatio input is not working
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62e25e0a0b17bf002aea2440
    function handleSave(data) {
      const aspectRatio = data.props.aspectRatio?.replace(":", "x");
      const newValues = { ...data.props, aspectRatio };
      props.onSave({ ...data, props: newValues });
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <EditModal
        {...elementProps}
        uu5Tag={props.componentType.uu5Tag}
        header={lsi.header}
        props={props.componentProps}
        tabList={tabList}
        propInputMap={propInputMap}
        onSave={handleSave}
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
