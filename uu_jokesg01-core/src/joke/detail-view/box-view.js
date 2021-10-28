//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Content from "./content";
import Lsi from "../detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxView",
  //@@viewOff:statics
};

// Prediction of the content height before we download and render it [px]
const PLACEHOLDER_HEIGHT = 500;

export const BoxView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
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
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
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
    onUpdate: () => {},
    onAddRating: () => {},
    onReload: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const header = <Header header={props.header} joke={props.jokeDataObject.data} />;
    const help = <UU5.Bricks.Lsi lsi={props.help} />;
    const actionList = getActions(props);

    return (
      <UuP.Bricks.ComponentWrapper
        header={header}
        help={help}
        cardView={props.cardView}
        elevation={props.elevation}
        bgStyle={props.bgStyle}
        borderRadius={props.borderRadius}
        hideCopyComponent={true}
        actionList={actionList}
        disabled={props.disabled}
        hidden={props.hidden}
        className={props.className}
        style={props.style}
        mainAttrs={props.mainAttrs}
        noIndex={props.noIndex}
        ref_={props.ref_}
      >
        <DataObjectStateResolver
          dataObject={props.jokesDataObject}
          nestingLevel={props.nestingLevel}
          height={PLACEHOLDER_HEIGHT}
        >
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel={props.nestingLevel}
            height={PLACEHOLDER_HEIGHT}
          >
            {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
            {() => (
              <Content
                jokeDataObject={props.jokeDataObject}
                jokesPermission={props.jokesPermission}
                categoryList={props.jokesDataObject.data.categoryList}
                baseUri={props.baseUri}
                colorSchema={props.colorSchema}
                showCopyComponent={props.showCopyComponent}
                onAddRating={props.onAddRating}
                onUpdateVisibility={props.onUpdateVisibility}
                onUpdate={props.onUpdate}
                onCopyComponent={props.onCopyComponent}
                className={Config.Css.css`margin: 16px`}
              />
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Header({ header, joke }) {
  return (
    <>
      {joke && !joke.visibility && <UU5.Bricks.Icon className={visibilityCss()} icon="mdi-eye-off" />}
      <UU5.Bricks.Lsi lsi={header} />
      {joke && ` - ${joke.name}`}
    </>
  );
}

function getActions(props) {
  const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataObject.data !== null;
  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      content: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
      onClick: props.onReload,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      content: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onCopyComponent,
    });
  }

  return actionList;
}

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default BoxView;
