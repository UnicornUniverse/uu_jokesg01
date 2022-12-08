//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Tile, Text, Pending } from "uu5g05-elements";
import { DataObjectStateResolver } from "../../core/core";
import Header from "./header";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
const PLACEHOLDER_HEIGHT = "100%";
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      height: "100%",
    }),

  text: (parent) =>
    Config.Css.css({
      display: "block",
      marginLeft: parent.padding.left,
      marginRight: parent.padding.right,
      marginBottom: parent.padding.bottom,
      marginTop: parent.padding.top,
    }),

  image: () => Config.Css.css({ width: "100%" }),
};
//@@viewOff:css

//@@viewOn:helpers
function Footer(props) {
  function handleRatingClick(rating, event) {
    event.stopPropagation();
    props.onAddRating(rating, props.jokeDataObject);
  }

  const joke = props.jokeDataObject.data;
  const canAddRating = props.jokesPermission.joke.canAddRating(joke);
  const actionsDisabled = props.jokeDataObject.state === "pending";

  return (
    <div className={Config.Css.css({ display: "flex", justifyContent: "center" })}>
      <UU5.Bricks.Rating
        value={joke.averageRating}
        onClick={canAddRating ? handleRatingClick : undefined}
        disabled={actionsDisabled}
      />
    </div>
  );
}
//@@viewOff:helpers

export const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BoxView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BoxView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    function handleDetail() {
      props.onDetail(props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, contentProps] = Utils.VisualComponent.splitProps(props);
    const joke = props.jokeDataObject.data;
    const headerElement = <Header joke={props.jokeDataObject.data} hideTypeName={props.hideTypeName} />;
    const footerElement = props.jokeDataObject.data && <Footer {...contentProps} />;

    // ISSUE Tile - a lot of issues
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=62e19a610b17bf002ae9d725
    return (
      <Tile
        {...elementProps}
        header={headerElement}
        footer={footerElement}
        footerSignificance="distinct"
        borderRadius={props.borderRadius}
        aspectRatio={props.aspectRatio}
        width={props.width}
        height={props.height}
        onClick={handleDetail}
        significance={props.significance}
        actionList={props.actionList}
      >
        {(tile) => (
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={errorsLsi}
          >
            <DataObjectStateResolver
              dataObject={props.jokeDataObject}
              height={PLACEHOLDER_HEIGHT}
              customErrorLsi={errorsLsi}
            >
              {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
              {() => (
                <div className={Css.content()}>
                  {!joke.image && (
                    <Text
                      category="interface"
                      segment="content"
                      type="medium"
                      colorScheme="building"
                      className={Css.text(tile)}
                    >
                      {joke.text}
                    </Text>
                  )}
                  {joke.image && (
                    <>
                      {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}
                      {!joke.imageUrl && <Pending size="xl" />}
                    </>
                  )}
                </div>
              )}
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        )}
      </Tile>
    );
    //@@viewOff:render
  },
});

export default BoxView;
