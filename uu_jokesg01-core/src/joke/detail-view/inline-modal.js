//@@viewOn:imports
import { createVisualComponent, PropTypes, useEffect, Lsi } from "uu5g05";
import { Modal, Icon } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "../config/config";
import Content from "./content";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineModal",
  //@@viewOff:statics
};

export const InlineModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    categoryList: PropTypes.array.isRequired,
    baseUri: PropTypes.string,
    header: PropTypes.object,
    shown: PropTypes.bool,
    showCopyComponent: PropTypes.bool,
    showDelete: PropTypes.bool,
    onClose: PropTypes.func,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onDelete: PropTypes.func,
    actionList: PropTypes.array,
    bgStyle: PropTypes.string,
    colorSchema: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    preferenceDataObject: {
      state: "ready",
      data: {
        showCategories: true,
        showAuthor: true,
        showCreationTime: true,
        disableUserPreference: true,
      },
    },
    categoryList: [],
    isHome: false,
    contextType: "basic",
    header: "",
    shown: false,
    showCopyComponent: true,
    showDelete: false,
    onClose: () => {},
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onDelete: () => {},
    actionList: [],
    bgStyle: "transparent",
    colorSchema: "default",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    useEffect(() => {
      async function checkDataAndLoad() {
        if (props.preferenceDataObject.state === "readyNoData") {
          try {
            await props.preferenceDataObject.handlerMap.load();
          } catch (error) {
            console.error(error);
          }
        }
      }

      checkDataAndLoad();
    });
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Modal
        header={<Header header={props.header} joke={props.jokeDataObject.data} />}
        open={props.shown}
        onClose={props.onClose}
        actionList={props.actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <DataObjectStateResolver dataObject={props.preferenceDataObject} customErrorLsi={PreferenceErrorsLsi}>
          {() => (
            <>
              <ContextBar
                jokes={props.jokesDataObject.data}
                awsc={props.awscDataObject.data}
                contextType={props.contextType}
                isHome={props.isHome}
              />
              <Content
                jokeDataObject={props.jokeDataObject}
                jokesPermission={props.jokesPermission}
                categoryList={props.jokesDataObject.data.categoryList}
                baseUri={props.baseUri}
                colorSchema={props.colorSchema}
                bgStyle={props.bgStyle}
                onAddRating={props.onAddRating}
                onUpdate={props.onUpdate}
                onUpdateVisibility={props.onUpdateVisibility}
                onCopyComponent={props.onCopyComponent}
                onDelete={props.onDelete}
                showCopyComponent={props.showCopyComponent}
                showCategories={props.preferenceDataObject.data.showCategories}
                showAuthor={props.preferenceDataObject.data.showAuthor}
                showCreationTime={props.preferenceDataObject.data.showCreationTime}
                showDelete={props.showDelete}
                disabled={props.disabled}
              />
            </>
          )}
        </DataObjectStateResolver>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Header({ header, joke }) {
  return (
    <>
      {joke && !joke.visibility && <Icon className={visibilityCss()} icon="mdi-eye-off" />}
      <Lsi lsi={header} />
      &nbsp;
      {joke && ` - ${joke.name}`}
    </>
  );
}

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default InlineModal;
