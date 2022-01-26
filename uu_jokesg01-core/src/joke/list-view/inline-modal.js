//@@viewOn:imports
import { createVisualComponent, Lsi, useEffect } from "uu5g05";
import { Modal } from "uu5g05-elements";
import { DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import Content from "./content";
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
    ...Config.Types.InlineModal.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.Component.Properties.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineModal.defaultProps,
    ...Config.Types.IdentificationData.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
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
    const { header, shown, actionList, awscDataObject, contextType, isHome, onClose, ...contentProps } = props;

    return (
      <Modal
        header={<Lsi lsi={header} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
        width="full"
      >
        <DataListStateResolver dataList={props.jokeDataList}>
          {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
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
        </DataListStateResolver>
      </Modal>
    );
    //@@viewOff:render
  },
});

export default InlineModal;
