//@@viewOn:imports
import { createVisualComponent, Utils, useState, Lsi } from "uu5g05";
import { Icon, Link } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g02";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
import JokesUtils from "../../utils/utils";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

export const InlineView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineView.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineView.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);
    const { baseUri } = useSubApp();

    function handleDetail(event) {
      // Is it Ctrl + click?
      if (event.ctrlKey || event.metaKey) {
        const componentProps = {
          baseUri: baseUri,
          jokeId: props.jokeDataObject.data.id,
        };

        JokesUtils.redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps);
      } else {
        setIsModal(true);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, modalProps] = Utils.VisualComponent.splitProps(props);
    const attrs = Utils.VisualComponent.getAttrs(elementProps);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel="inline"
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <span>
                  {!props.jokeDataObject.data.visibility && <Icon className={visibilityCss()} icon="mdi-eye-off" />}
                  <Lsi lsi={props.header} />
                  {" - "}
                  <Link onClick={handleDetail}>{props.jokeDataObject.data.name}</Link>
                </span>
                {isModal && <InlineModal {...modalProps} onClose={() => setIsModal(false)} shown />}
              </>
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 4px;
`;
//@@viewOff:css

export default InlineView;
