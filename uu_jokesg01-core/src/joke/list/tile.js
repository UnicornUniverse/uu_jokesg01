//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent, useEffect, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import { Grid } from "uu5tilesg02-elements";
import { Text } from "uu5g05-elements";
import { JokeContext } from "../use-joke.js";
import Detail from "../detail.js";
import Config from "./config/config.js";
//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Grid.DefaultTile.propTypes,
    data: PropTypes.object,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Grid.DefaultTile.defaultProps,
  },
  //@@viewOff:defaultProps

  render({ data: jokeDto, getItemActionList, ...propsToPass }) {
    //@@viewOn:private
    const { baseUri } = useSubApp();
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);

    useEffect(() => {
      if (jokeDto.data.image && !jokeDto.data.imageUrl && jokeDto.state === "ready" && jokeDto.handlerMap?.loadImage) {
        jokeDto.handlerMap.loadImage(jokeDto.data).catch((error) => Tile.logger.error("Error loading image", error));
      }
    }, [jokeDto]);

    const value = useMemo(() => ({ jokeDto, baseUri, oid: jokeDto.data.oid }), [jokeDto, baseUri]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokeContext.Provider value={value}>
        <Detail
          {...elementProps}
          nestingLevel="box"
          title={{
            box: (
              <Text category="interface" segment="title" type="micro">
                {jokeDto.data.name}
              </Text>
            ),
          }}
          subtitle={{ box: null }}
          getActionList={getItemActionList}
          identificationType="none"
          height="100%"
          width="100%"
          borderRadius="none"
          displayHelpCenter={false}
          significance="subdued"
          hideConfiguration
        />
      </JokeContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
