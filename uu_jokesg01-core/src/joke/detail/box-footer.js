//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, useRef, Utils } from "uu5g05";
import { Box, Text, Grid, Icon, UuGds, useModal, Tooltip } from "uu5g05-elements";
import { Rating } from "uu5extrasg01";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import Joke from "../../utils/joke.js";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const BoxFooter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxFooter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ joke, preference, ...propsToPass }) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [BoxFooter.uu5Tag]);
    const jokeLsi = useLsi(importLsi, [Joke.APP_TYPE]);
    const { elementProps } = Utils.VisualComponent.splitProps(propsToPass);
    const [tooltip, openTooltip, closeTooltip] = useModal();
    const personPhotoRef = useRef();
    const visibilityRef = useRef();

    const authorTooltip = Utils.String.format(viewLsi.authorTooltip, { name: joke.uuIdentityName });
    //@@viewOff:private

    //@@viewOn:render
    return (
      <>
        <Box {...elementProps} significance="distinct">
          <Grid templateColumns="2fr 1fr">
            <Grid.Item justifySelf="start" alignSelf="center">
              <Rating value={joke.averageRating} />
              <Text significance="subdued" colorScheme="building">
                {" "}
                ( {joke.ratingCount} )
              </Text>
            </Grid.Item>
            <Grid.Item justifySelf="end">
              {!joke.visibility && (
                <Text
                  significance="subdued"
                  colorScheme="building"
                  elementRef={visibilityRef}
                  elementAttrs={{
                    "aria-label": jokeLsi.visibility.unpublished,
                    onMouseEnter: () =>
                      openTooltip({ element: visibilityRef.current, children: jokeLsi.visibility.unpublished }),
                    onMouseLeave: () => closeTooltip(),
                  }}
                  className={Config.Css.css({ marginRight: UuGds.SpacingPalette.getValue(["fixed", "c"]) })}
                >
                  <Icon icon="mdi-eye-off" />
                </Text>
              )}
              {preference.showAuthor && (
                <PersonPhoto
                  elementRef={personPhotoRef}
                  elementAttrs={{
                    "aria-label": authorTooltip,
                    onMouseEnter: () => openTooltip({ element: personPhotoRef.current, children: authorTooltip }),
                    onMouseLeave: () => closeTooltip(),
                  }}
                  uuIdentity={joke.uuIdentity}
                  size="xxs"
                />
              )}
            </Grid.Item>
          </Grid>
        </Box>
        {tooltip.open && <Tooltip {...tooltip} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BoxFooter };
export default BoxFooter;
//@@viewOff:exports
