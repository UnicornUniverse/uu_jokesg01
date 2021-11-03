//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import { DataListStateResolver } from "../../core/core";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Modal",
  //@@viewOff:statics
};

export const Modal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: UU5.PropTypes.object.isRequired,
    help: UU5.PropTypes.object.isRequired,
    jokeDataList: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onLoad: UU5.PropTypes.func,
    onLoadNext: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onClose: UU5.PropTypes.func,
    shown: UU5.PropTypes.bool,
    actionList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
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
      <Uu5Elements.Modal
        header={<UU5.Bricks.Lsi lsi={props.header} />}
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
          )}
        </DataListStateResolver>
      </Uu5Elements.Modal>
    );
    //@@viewOff:render
  },
});

export default Modal;
