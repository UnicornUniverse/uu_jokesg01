//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
//import UuTerritory from "uu_territoryg01";
//import "uu_territoryg01-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

//artifactId

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoContent",
  nestingLevel: "box",
  //@@viewOff:statics
};

//@@viewOn:css
const Css = {
  panelHeader: () => Config.Css.css`
  .uu5-bricks-panel-header {
    padding: 0px;
    min-height: 0px;
  }
  .uu5-bricks-panel-body-body{
    padding: 0px;
    font-size: initial;
  }
 `,
};
//@@viewOff:css

export const JokesBasicInfoContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    expanded: UU5.PropTypes.bool.isRequired,
    expandButton: UU5.PropTypes.bool.isRequired,
    editButtons: UU5.PropTypes.bool.isRequired,
    onUpdate: UU5.PropTypes.func.isRequired,
    onSetState: UU5.PropTypes.func.isRequired,
    bgStyle: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokesDataObject: undefined,
    jokesPermission: undefined,
    expanded: false,
    expandButton: false,
    editButtons: false,
    onUpdate: () => {},
    onSetState: () => {},
    bgStyle: "transparent",
    elevation: 1,
    borderRadius: "0",
    colorSchema: "default",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokesData = props.jokesDataObject.data;
    console.log(jokesData);
    const [isExpanded, setIsExpanded] = useState(props.expanded);

    const updateActionList =
      props.jokesPermission.jokes.canUpdate() && props.editButtons
        ? [{ icon: "plus4u-more-vertical", content: "Settings", onClick: props.onUpdate }]
        : [];

    const setStateActionList =
      props.jokesPermission.jokes.canSetState() && props.editButtons
        ? [{ icon: "plus4u-more-vertical", onClick: props.onSetState }]
        : [];

    const uuBtActionList = jokesData.sysData.artifactUri
      ? [
          {
            icon: isExpanded ? "mdi-chevron-up" : "mdi-chevron-down",
            onClick: () => setIsExpanded(!isExpanded),
            disabled: !props.expandButton,
          },
        ]
      : [];

    /*const productInfoList = useMemo(
      () => getProductInfoList(props.productInfoMask, jokesData.sysData , props.baseUri, props.asidBaseUri),
      [props.productInfoMask, jokesData.sysData , props.baseUri, props.asidBaseUri]
    );*/

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

        <UuP.Bricks.BasicInfoSection
          rows={[{ label: "Section with product Info", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
          actionList={uuBtActionList}
        />

        <UU5.Bricks.Panel
          bgStyleHeader="transparent"
          expanded={isExpanded}
          className={Css.panelHeader()}
          header=" "
          content={
            <>
              <UuP.Bricks.BasicInfoSection
                rows={[{ label: "Section with Type", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
              />
              <UuP.Bricks.BasicInfoSection
                rows={[{ label: "Section with Territory", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
              />
              <UuP.Bricks.BasicInfoSection
                rows={[
                  {
                    label: "Section with Responsible Role",
                    content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} />,
                  },
                ]}
              />
              <UuP.Bricks.BasicInfoSection
                rows={[{ label: "Section with Bw List", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
              />
              <UuP.Bricks.BasicInfoSection
                rows={[{ label: "Section with Instance", content: <UU5.Bricks.Icon icon={"plus4u-mark-question"} /> }]}
              />
            </>
          }
        />
        {isExpanded && jokesData.sysData.artifactUri && (
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
            {/*
              <SectionWithType artifact={jokesData.sysData.artifact} />
              <SectionWithTerritory jokes={jokesData.sysData} />
              <SectionWithResponsibleRole jokes={jokesData.sysData} />
              <SectionWithBWList
                uuBtBaseUri={jokesData.sysData.artifactUri}
                blackAndWhiteList={jokesData.sysData.artifact.blackAndWhiteList}
              />
              <SectionWithInstance
                awid={jokesData.sysData.awid}
                asidBaseUri={jokesData.sysData.asidBaseUri}
                showSeparator={productInfoList.length !== 0}
              />
              <SectionWithProductInfo productInfoList={productInfoList} />
            */}
          </>
        )}
      </UuP.Bricks.BasicInfo>
    );
    //@@viewOff:render
  },
});
//viewOn:helpers
/*function SectionWithType({ artifact }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <UU5.Bricks.Lsi lsi={Lsi.type} />, content: artifact.typeName },
        { label: <UU5.Bricks.Lsi lsi={Lsi.category} />, content: artifact.category },
        { label: <UU5.Bricks.Lsi lsi={Lsi.revision} />, content: artifact.revision },
      ]}
    />
  );
}

function SectionWithTerritory({ jokes }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.territory} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={jokes.uuBtBaseUri}
              artifactName={jokes.context.territory.name}
              href={jokes.uuBtBaseUri}
              icon={"uubml-territory-uu"}
              artifactStateIcon={jokes.artifact.stateIcon}
            />
          ),
        },
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.unit} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink territoryBaseUri={jokes.uuBtBaseUri} artifactData={jokes.context.unit} />
          ),
        },
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.folder} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={jokes.uuBtBaseUri}
              artifactData={jokes.context.folder}
            />
          ),
        },
      ]}
    />
  );
}

function SectionWithResponsibleRole({ jokes }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.responsible} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={jokes.uuBtBaseUri}
              artifactData={jokes.context.responsibleRole}
            />
          ),
        },
      ]}
    />
  );
}

function SectionWithBWList({ uuBtBaseUri, blackAndWhiteList }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.blackAndWhite} />,
          content: <UuTerritory.Bricks.ArtifactLink territoryBaseUri={uuBtBaseUri} artifactData={blackAndWhiteList} />,
        },
      ]}
    />
  );
}

function SectionWithInstance({ awid, asidBaseUri, showSeparator }) {
  const [, asid] = UU5.Common.Url.parse(asidBaseUri).pathName.split("/");
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <UU5.Bricks.Lsi lsi={Lsi.awid} />, content: awid },
        { label: <UU5.Bricks.Lsi lsi={Lsi.asid} />, content: asid },
      ]}
      showSeparator={showSeparator}
    />
  );
}*/
//viewOff:helpers
export default JokesBasicInfoContent;
