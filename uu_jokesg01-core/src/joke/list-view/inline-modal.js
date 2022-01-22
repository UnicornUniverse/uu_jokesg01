//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useEffect } from "uu5g05";
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
    header: PropTypes.object.isRequired,
    help: PropTypes.object.isRequired,
    jokeDataList: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    baseUri: PropTypes.string,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadNext: PropTypes.func,
    onReload: PropTypes.func,
    onCreate: PropTypes.func,
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onClose: PropTypes.func,
    shown: PropTypes.bool,
    actionList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    isHome: false,
    contextType: "basic",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onLoad: () => {},
    onLoadNext: () => {},
    onReload: () => {},
    onCreate: () => {},
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onClose: () => {},
    shown: false,
    actionList: [],
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
    return (
      <Modal
        header={<Lsi lsi={props.header} />}
        open={props.shown}
        onClose={props.onClose}
        actionList={props.actionList}
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
                awsc={props.awscDataObject.data}
                contextType={props.contextType}
                isHome={props.isHome}
              />
              <Content
                data={props.jokeDataList.data}
                categoryList={props.jokesDataObject.data.categoryList}
                pageSize={props.jokeDataList.pageSize}
                baseUri={props.baseUri}
                jokesPermission={props.jokesPermission}
                onLoad={props.onLoad}
                onLoadNext={props.onLoadNext}
                onReload={props.onReload}
                onCreate={props.onCreate}
                onDetail={props.onDetail}
                onUpdate={props.onUpdate}
                onDelete={props.onDelete}
                onAddRating={props.onAddRating}
                onUpdateVisibility={props.onUpdateVisibility}
                colorSchema={props.colorSchema}
                disabled={props.disabled}
              />
            </>
          )}
        </DataListStateResolver>
      </Modal>
    );
    //@@viewOff:render
  },
});

export default InlineModal;
