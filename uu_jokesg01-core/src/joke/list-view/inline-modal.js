//@@viewOn:imports
import { createVisualComponent, Lsi, useEffect } from "uu5g05";
import { Modal, useSpacing } from "uu5g05-elements";
import { DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

const Css = {
  contextBar: ({ spaceA, spaceB }) => Config.Css.css({ marginTop: -spaceB, marginLeft: -spaceA, marginRight: -spaceA }),
  content: ({ spaceA, spaceB }, identificationType) =>
    Config.Css.css({
      marginTop: identificationType === "none" ? -spaceB : 0,
      marginLeft: -spaceA,
      marginRight: -spaceA,
    }),
};

export const InlineModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineModal.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.List.Properties.propTypes,
    ...Config.Types.List.AsyncData.propTypes,
    ...Config.Types.List.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineModal.defaultProps,
    ...Config.Types.IdentificationData.defaultProps,
    ...Config.Types.List.Properties.defaultProps,
    ...Config.Types.List.AsyncData.defaultProps,
    ...Config.Types.List.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();

    // HINT: The Joke.ListProvider is rendered with prop skipInitialLoad.
    // The view is responsible to tell when the jokeDataList should be loaded.
    // And why? In inline nesting level we need to load data only when user opens
    // the modal window BUT in BoxCollection component we need to load data immediately.
    useEffect(() => {
      if (props.jokeDataList.state !== "pending" && props.jokeDataList.state !== "pendingNoData") {
        // HINT: We trigger loading through event to show alerts if there is issue with data reloading.
        props.onLoad();
      }
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    const { header, info, shown, actionList, awscDataObject, isHome, onClose, identificationType, ...contentProps } =
      props;

    return (
      <Modal
        header={<Lsi lsi={header} />}
        info={<Lsi lsi={info} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
        fullscreen
      >
        <DataListStateResolver
          dataList={props.jokeDataList}
          colorScheme={props.colorScheme}
          background={props.background}
        >
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
          {() => (
            <>
              <ContextBar
                jokes={props.jokesDataObject.data}
                awsc={awscDataObject.data}
                contextType={identificationType}
                isHome={isHome}
                className={Css.contextBar(spacing)}
              />
              {/* Props rowCount is set to null to have content over the whole screen */}
              <Content {...contentProps} rowCount={null} className={Css.content(spacing, identificationType)} />
            </>
          )}
        </DataListStateResolver>
      </Modal>
    );
    //@@viewOff:render
  },
});

export default InlineModal;
