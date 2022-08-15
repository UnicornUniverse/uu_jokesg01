//@@viewOn:imports
import { createVisualComponent, Lsi, useEffect } from "uu5g05";
import { IdentificationModal } from "uu_plus4u5g02-elements";
import { DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

export const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.DetailModal.propTypes,
    ...Config.Types.IdentificationData.propTypes,
    ...Config.Types.List.Properties.propTypes,
    ...Config.Types.List.AsyncData.propTypes,
    ...Config.Types.List.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.DetailModal.defaultProps,
    ...Config.Types.IdentificationData.defaultProps,
    ...Config.Types.List.Properties.defaultProps,
    ...Config.Types.List.AsyncData.defaultProps,
    ...Config.Types.List.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    // HINT: The Joke.ListProvider is rendered with prop skipInitialLoad.
    // The view is responsible to tell when the jokeDataList should be loaded.
    // And why? In inline nesting level we need to load data only when user opens
    // the modal window BUT in AreaView component we need to load data immediately.
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
      <IdentificationModal
        header={header}
        info={<Lsi lsi={info} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        disabled={props.disabled}
        identificationType={identificationType}
        fullscreen
      >
        {() => (
          <DataListStateResolver dataList={props.jokeDataList} colorScheme={props.colorScheme}>
            {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
            {() => (
              <>
                <ContextBar
                  jokes={props.jokesDataObject.data}
                  awsc={awscDataObject.data}
                  contextType={identificationType}
                  isHome={isHome}
                />
                {/* Props rowCount is set to null to have content over the whole screen */}
                <Content {...contentProps} rowCount={null} />
              </>
            )}
          </DataListStateResolver>
        )}
      </IdentificationModal>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
