//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g05";
import { Pending, Button, Box, Text, useSpacing } from "uu5g05-elements";
import Header from "./header";
import Config from "./config/config";
import LsiData from "./box-content-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),

  header: ({ spaceB }) =>
    Config.Css.css({
      display: "block",
      padding: spaceB,
      height: 48,
    }),

  content: (image) =>
    Config.Css.css({
      display: "flex",
      alignItems: image ? "center" : "left",
      justifyContent: image ? "center" : "flex-start",
      height: "calc(100% - 48px - 48px)",
      overflow: "hidden",
    }),

  text: ({ spaceB }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceB,
      marginRight: spaceB,
      marginBottom: spaceB,
    }),

  image: () => Config.Css.css({ width: "100%" }),

  footer: ({ spaceB, spaceC }) =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      paddingLeft: spaceB,
      paddingRight: spaceC,
      borderRadius: "0 0 min(calc(height * .1), 4px) min(calc(height * .1), 4px);",
    }),
};
//@@viewOff:css

export const BoxContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Detail.Preferences.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Detail.Preferences.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();

    function handleUpdate(event) {
      event.stopPropagation();
      props.onUpdate(props.jokeDataObject);
    }

    function handleDelete(event) {
      event.stopPropagation();
      props.onDelete(props.jokeDataObject);
    }

    function handleRatingClick(rating, event) {
      event.stopPropagation();
      props.onAddRating(rating, props.jokeDataObject);
    }

    function handleVisibility(event) {
      event.stopPropagation();
      props.onUpdateVisibility(!joke.visibility, props.jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download

    const joke = props.jokeDataObject.data;
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = props.jokeDataObject.state === "pending";

    return (
      <div className={Css.main()}>
        <Text category="interface" segment="title" type="micro" colorScheme="building" className={Css.header(spacing)}>
          <Header header={props.header} joke={joke} hideTypeName={props.hideTypeName} />
        </Text>

        <div className={Css.content(joke.image)}>
          {joke.text && !joke.image && (
            <Text
              category="interface"
              segment="content"
              type="medium"
              colorScheme="building"
              className={Css.text(spacing)}
            >
              {joke.text}
            </Text>
          )}
          {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}
          {joke.image && !joke.imageUrl && <Pending size="xl" />}
        </div>

        <Box className={Css.footer(spacing)} significance="distinct">
          {
            // ISSUE - Uu5Elements - No alternative for UU5.Bricks.Rating
            // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd485572961002969f212
          }
          <UU5.Bricks.Rating
            value={joke.averageRating}
            onClick={canAddRating ? handleRatingClick : undefined}
            disabled={actionsDisabled}
            colorSchema={props.colorSchema}
          />
          {canManage && (
            <div>
              <Button
                icon="mdi-pencil"
                onClick={handleUpdate}
                disabled={actionsDisabled}
                significance="subdued"
                tooltip={LsiData.update}
              />
              <Button
                icon={joke.visibility ? "mdi-eye-off" : "mdi-eye"}
                onClick={handleVisibility}
                disabled={actionsDisabled}
                significance="subdued"
                tooltip={joke.visibility ? LsiData.hide : LsiData.show}
              />
              {props.showDelete && (
                <Button
                  icon="mdi-delete"
                  onClick={handleDelete}
                  disabled={actionsDisabled}
                  significance="subdued"
                  tooltip={LsiData.delete}
                />
              )}
            </div>
          )}
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

export default BoxContent;
