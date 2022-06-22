//@@viewOn:imports
import { createVisualComponent, useEffect, Lsi } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import { IdentificationModal } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
import ContextBar from "../../jokes/context-bar";
import Content from "./content";
import JokeErrorsLsi from "../errors-lsi";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
//@@viewOff:imports

const PLACEHOLDER_HEIGHT = "100%";

const Css = {
  contextBar: ({ spaceA }) => Config.Css.css({ marginTop: -spaceA, marginLeft: -spaceA, marginRight: -spaceA }),
  content: ({ spaceA, spaceB }, identificationType) =>
    Config.Css.css({
      marginTop: identificationType === "none" ? -spaceB : 0,
      marginLeft: -spaceA,
      marginRight: -spaceA,
      marginBottom: -spaceA,
    }),
};

export const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.DetailModal.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.DetailModal.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();

    useEffect(() => {
      if (
        props.jokeDataObject.data?.image &&
        !props.jokeDataObject.data.imageUrl &&
        props.jokeDataObject.state === "ready"
      ) {
        props.jokeDataObject.handlerMap
          .getImage(props.jokeDataObject.data)
          .catch((error) => DetailModal.logger.error("Error loading image", error));
      }
    }, [props.jokeDataObject]);

    useEffect(() => {
      async function checkDataAndLoad() {
        if (props.preferenceDataObject?.state === "readyNoData") {
          try {
            await props.preferenceDataObject.handlerMap.load();
          } catch (error) {
            DetailModal.logger.error("Error reloading preference data", error);
          }
        }
      }

      checkDataAndLoad();
    });
    //@@viewOff:private

    //@@viewOn:render
    const { header, info, shown, actionList, awscDataObject, isHome, onClose, identificationType, ...contentProps } =
      props;
    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;

    return (
      <IdentificationModal
        header={headerElement}
        info={<Lsi lsi={info} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
        identificationType={identificationType}
        closeOnOverlayClick
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} height={PLACEHOLDER_HEIGHT}>
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={JokeErrorsLsi}
          >
            <DataObjectStateResolver dataObject={props.preferenceDataObject} customErrorLsi={PreferenceErrorsLsi}>
              {() => (
                <>
                  <ContextBar
                    jokes={props.jokesDataObject.data}
                    awsc={awscDataObject.data}
                    contextType={identificationType}
                    isHome={isHome}
                    className={Css.contextBar(spacing)}
                  />
                  <Content {...contentProps} className={Css.content(spacing, identificationType)} />
                </>
              )}
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </IdentificationModal>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
