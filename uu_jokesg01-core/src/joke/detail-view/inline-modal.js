//@@viewOn:imports
import { createVisualComponent, useEffect, Lsi } from "uu5g05";
import { Modal, Icon } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import Content from "./content";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
//@@viewOff:imports

export const InlineModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineModal.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineModal.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
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
    const { header, info, shown, actionList, awscDataObject, contextType, isHome, onClose, ...contentProps } = props;
    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;

    return (
      <Modal
        header={headerElement}
        info={<Lsi lsi={info} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <DataObjectStateResolver dataObject={props.preferenceDataObject} customErrorLsi={PreferenceErrorsLsi}>
          {() => (
            <>
              <ContextBar
                jokes={props.jokesDataObject.data}
                awsc={awscDataObject.data}
                contextType={contextType}
                isHome={isHome}
              />
              <Content {...contentProps} />
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
