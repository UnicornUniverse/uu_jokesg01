//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import JokeDetailContent from "./joke-detail-content";
import Lsi from "./joke-detail-box-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailBox",
  nestingLevel: "box",
  //@@viewOff:statics
};

export const JokeDetailBox = createVisualComponent({
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
    showCopyComponent: false,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //TODO Move Card above the resolvers
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
          <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel}>
            <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel={currentNestingLevel}>
              {isDataLoaded && (
                <JokeDetailContent
                  jokeDataObject={props.jokeDataObject}
                  jokesPermission={props.jokesPermission}
                  categoryList={props.jokesDataObject.data.categoryList}
                  baseUri={props.baseUri}
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

export default JokeDetailBox;
