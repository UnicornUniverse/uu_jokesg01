//@@viewOn:imports
import { createVisualComponent, Lsi, useEffect } from "uu5g05";
import { UuGds } from "uu5g05-elements";
import { IdentificationModal } from "uu_plus4u5g02-elements";
import { ControllerProvider } from "uu5tilesg02";
import { DataListStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      marginLeft: UuGds.SpacingPalette.getValue(["fixed", "c"]),
      marginRight: UuGds.SpacingPalette.getValue(["fixed", "c"]),
      marginBottom: UuGds.SpacingPalette.getValue(["fixed", "c"]),
    }),
};
//@@viewOff:css

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
    const {
      header,
      info,
      shown,
      actionList,
      awscDataObject,
      isHome,
      onClose,
      identificationType,
      onLoad,
      filterList,
      sorterList,
      filterDefinitionList,
      sorterDefinitionList,
      ...contentProps
    } = props;

    return (
      <ControllerProvider
        data={props.jokeDataList.data}
        filterDefinitionList={filterDefinitionList}
        sorterDefinitionList={sorterDefinitionList}
        filterList={filterList}
        sorterList={sorterList}
        onFilterChange={onLoad}
        onSorterChange={onLoad}
      >
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
                  <Content {...contentProps} rowCount={null} className={Css.content()} />
                </>
              )}
            </DataListStateResolver>
          )}
        </IdentificationModal>
      </ControllerProvider>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
