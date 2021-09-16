//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Content from "./content";
import Lsi from "./box-view-lsi";
//@@viewOff:imports

// TODO Rename to Box
const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxView",
  nestingLevel: "box",
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataObject.data !== null;
    const header = <Header header={props.header} joke={props.jokeDataObject.data} />;
    const help = <UU5.Bricks.Lsi lsi={props.help} />;

    const actionList = [
      {
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
        onClick: props.onCopyComponent,
      },
    ];

    return (
      <UuP.Bricks.ComponentWrapper
        header={header}
        help={help}
        cardView={props.cardView}
        copyTagFunc={props.onCopyComponent}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        hideCopyComponent={true}
        actionList={actionList}
        {...attrs}
      >
        <UU5.Bricks.Card
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          className="center"
          elevation={0}
          elevationHover={0}
        >
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            nestingLevel={currentNestingLevel}
            height={PLACEHOLDER_HEIGHT}
          >
            <DataObjectStateResolver
              dataObject={props.jokeDataObject}
              nestingLevel={currentNestingLevel}
              height={PLACEHOLDER_HEIGHT}
            >
              {isDataLoaded && (
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
        </UU5.Bricks.Card>
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

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default BoxView;
