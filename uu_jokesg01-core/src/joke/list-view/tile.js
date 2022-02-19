//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, useEffect } from "uu5g05";
import { Icon, Pending, Button, Box, Text, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
import LsiData from "./tile-lsi";
//@@viewOff:imports

//@@viewOn:css
export const TILE_HEIGHT = 200; // px

const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: TILE_HEIGHT,
    }),

  header: ({ spaceB, spaceC }) =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      gap: spaceC,
      padding: spaceB,
      height: 48,
    }),

  content: (image) =>
    Config.Css.css({
      display: "flex",
      alignItems: image ? "center" : "left",
      justifyContent: image ? "center" : "flex-start",
      height: 104,
      overflow: "hidden",
    }),

  text: ({ spaceB }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceB,
      marginRight: spaceB,
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

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const { data: jokeDataObject } = props;

    useEffect(() => {
      if (jokeDataObject.data.image && !jokeDataObject.data.imageUrl && jokeDataObject.state === "ready") {
        jokeDataObject.handlerMap.getImage(jokeDataObject.data).catch((error) => console.error(error));
      }
    }, [jokeDataObject]);

    function handleDetail(event) {
      event.stopPropagation();
      props.onDetail(jokeDataObject);
    }

    function handleUpdate(event) {
      event.stopPropagation();
      props.onUpdate(jokeDataObject);
    }

    function handleDelete(event) {
      event.stopPropagation();
      props.onDelete(jokeDataObject);
    }

    function handleRatingClick(rating, event) {
      event.stopPropagation();
      props.onAddRating(rating, jokeDataObject);
    }

    function handleVisibility(event) {
      event.stopPropagation();
      props.onUpdateVisibility(!joke.visibility, jokeDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download
    const joke = jokeDataObject.data;

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const actionsDisabled = jokeDataObject.state === "pending";

    return (
      <Box
        {...attrs}
        significance="subdued"
        borderRadius="elementary"
        onClick={handleDetail}
        background={props.background}
      >
        <Text
          category="interface"
          segment="title"
          type="micro"
          colorScheme="building"
          className={Css.header(spacing)}
          background={props.background}
        >
          {!joke.visibility && (
            <Text significance="subdued" colorScheme="building" background={props.background}>
              <Icon icon="mdi-eye-off" />
            </Text>
          )}
          {joke.name}
        </Text>

        <div className={Css.content(joke.image)}>
          {joke.text && !joke.image && (
            <Text
              category="interface"
              segment="content"
              type="medium"
              colorScheme="building"
              background={props.background}
              className={Css.text(spacing)}
            >
              {joke.text}
            </Text>
          )}
          {joke.imageUrl && <img src={joke.imageUrl} alt={joke.name} className={Css.image()} />}
          {joke.image && !joke.imageUrl && <Pending size="xl" background={props.background} />}
        </div>

        <Box className={Css.footer(spacing)} significance="distinct" background={props.background}>
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
                background={props.background}
              />
              <Button
                icon={joke.visibility ? "mdi-eye-off" : "mdi-eye"}
                onClick={handleVisibility}
                disabled={actionsDisabled}
                significance="subdued"
                tooltip={joke.visibility ? LsiData.hide : LsiData.show}
                background={props.background}
              />
              <Button
                icon="mdi-delete"
                onClick={handleDelete}
                disabled={actionsDisabled}
                significance="subdued"
                tooltip={LsiData.delete}
                background={props.background}
              />
            </div>
          )}
        </Box>
      </Box>
    );
    //@@viewOff:render
  },
});

export default Tile;
