//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

//artifactId

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoContent",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const JokesBasicInfoContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    expanded: UU5.PropTypes.bool.isRequired,
    expandButton: UU5.PropTypes.bool.isRequired,
    editButtons: UU5.PropTypes.bool.isRequired,
    onOpenJokesUpdateModal: UU5.PropTypes.func.isRequired,
    onOpenJokesSetStateModal: UU5.PropTypes.func.isRequired,
    bgStyle: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  // TODO LACO Fix property names according design (on*)
  //@@viewOn:defaultProps
  defaultProps: {
    jokesDataObject: undefined,
    jokesPermission: undefined,
    expanded: false,
    expandButton: false,
    editButtons: false,
    onOpenJokesUpdateModal: () => {},
    onOpenJokesSetStateModal: () => {},
    bgStyle: "transparent",
    elevation: 1,
    borderRadius: "0",
    colorSchema: "default",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokesData = props.jokesDataObject.data;
    const [isExpanded, setIsExpanded] = useState(props.expanded);

    // TODO LACO Change to props.jokesPermission.jokes.canUpdate
    const updateActionList =
      props.jokesPermission.isAuthority && props.editButtons
        ? [{ icon: "plus4u-more-vertical", content: "Settings", onClick: props.onOpenJokesUpdateModal }]
        : [];

    // TODO LACO Change to props.jokesPermission.jokes.canSetState
    const setStateActionList =
      props.jokesPermission.isAuthority && props.editButtons
        ? [{ icon: "plus4u-more-vertical", onClick: props.onOpenJokesSetStateModal }]
        : [];

    // TODO LACO What is purpose?
    const uuBtInfoSections = () => {
      return (
        <>
          <UuP.Bricks.BasicInfoSection
            rows={[{ label: "Section with Type", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
          />
          <UuP.Bricks.BasicInfoSection
            rows={[{ label: "Section with Territory", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
          />
          <UuP.Bricks.BasicInfoSection
            rows={[
              { label: "Section with Responsible Role", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> },
            ]}
          />
          <UuP.Bricks.BasicInfoSection
            rows={[{ label: "Section with Bw List", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
          />
          <UuP.Bricks.BasicInfoSection
            rows={[{ label: "Section with Instance", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
          />
        </>
      );
    };

    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <UuP.Bricks.BasicInfo
        bgStyle={props.bgStyle}
        elevation={props.elevation}
        borderRadius={props.borderRadius}
        colorSchema={props.colorSchema}
      >
        <UuP.Bricks.BasicInfoSection
          rows={[{ label: "Name", content: jokesData?.name }]}
          actionList={updateActionList}
        />
        <UuP.Bricks.BasicInfoSection
          rows={[
            {
              label: "State",
              content: (
                <UuP.Bricks.State type="button" stateType={jokesData?.state} stateIcon={"uubml-state-s02-active"} />
              ),
            },
          ]}
          actionList={setStateActionList}
        />
        {props.expandButton && (
          <UuP.Bricks.BasicInfoSection
            rows={[{ label: "Section with product Info", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
            actionList={[
              {
                icon: isExpanded ? "plus4u-arrow-up-double" : "plus4u-arrow-down-double",
                onClick: () => setIsExpanded(!isExpanded),
              },
            ]}
          />
        )}
        {isExpanded && jokesData.artifactId && uuBtInfoSections()}
      </UuP.Bricks.BasicInfo>
    );
    //@@viewOff:render
  },
});
export default JokesBasicInfoContent;
