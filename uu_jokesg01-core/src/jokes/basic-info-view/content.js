//@@viewOn:imports
import UU5 from "uu5g04";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import { createVisualComponent, useState, useMemo } from "uu5g04-hooks";
import "uu5g04-bricks";
import "uu_pg01-bricks";
import "uu_territoryg01-bricks";

import Config from "./config/config";
import Lsi from "./content-lsi";
//@@viewOff:imports

//artifactId

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
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

export const Content = createVisualComponent({
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
    productInfoMask: UU5.PropTypes.string,
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
    productInfoMask: "111",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokes = props.jokesDataObject.data;
    const [isExpanded, setIsExpanded] = useState(props.expanded);

    function handlePanelIconClick() {
      setIsExpanded((isExpanded) => !isExpanded);
    }

    let productInfoList = useMemo(() => getProductInfoList(props.productInfoMask, jokes), [
      props.productInfoMask,
      jokes,
    ]);
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <UuP.Bricks.BasicInfo>
        <SectionHeader
          jokes={jokes}
          jokesPermission={props.jokesPermission}
          editButtons={props.editButtons}
          onUpdate={props.onUpdate}
        />
        <SectionWithExpandButton
          isExpanded={isExpanded}
          expandButton={props.expandButton}
          handlePanelIconClick={handlePanelIconClick}
        />
        <UU5.Bricks.Panel bgStyleHeader="transparent" expanded={isExpanded} className={Css.panelHeader()} header=" ">
          <SectionWithType artifact={jokes.territoryData.data.artifact} />
          <SectionWithState
            artifact={jokes.territoryData.data.artifact}
            jokesPermission={props.jokesPermission}
            editButtons={props.editButtons}
            onSetState={props.onSetState}
          />
          <SectionWithTerritory territory={jokes.territoryData.data} />
          <SectionWithResponsibleRole territory={jokes.territoryData.data} />
          <SectionWithBWList territory={jokes.territoryData.data} />
          <SectionWithInstance jokes={jokes} showSeparator={productInfoList.length !== 0} />
          <SectionWithProductInfo productInfoList={productInfoList} />
        </UU5.Bricks.Panel>
      </UuP.Bricks.BasicInfo>
    );
    //@@viewOff:render
  },
});
//viewOn:helpers
function SectionHeader({ jokes, jokesPermission, onUpdate, editButtons }) {
  const updateActionList =
    jokesPermission.jokes.canUpdate() && editButtons ? [{ icon: "mdi-pencil", onClick: onUpdate }] : [];

  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <UU5.Bricks.Lsi lsi={Lsi.name} />, content: jokes.name },
        { label: <UU5.Bricks.Lsi lsi={Lsi.code} />, content: jokes.territoryData?.data.artifact.code },
        { label: <UU5.Bricks.Lsi lsi={Lsi.id} />, content: jokes.id },
      ]}
      actionList={updateActionList}
    />
  );
}

function SectionWithExpandButton({ isExpanded, expandButton, handlePanelIconClick }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[{}]}
      actionList={[
        {
          icon: isExpanded ? "mdi-chevron-up" : "mdi-chevron-down",
          onClick: handlePanelIconClick,
          disabled: !expandButton,
        },
      ]}
      showSeparator={isExpanded}
    />
  );
}

function SectionWithType({ artifact }) {
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

function SectionWithState({ artifact, editButtons, jokesPermission, onSetState }) {
  const setStateActionList =
    jokesPermission.jokes.canSetState() && editButtons ? [{ icon: "mdi-pencil", onClick: onSetState }] : [];

  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.state} />,
          content: (
            <UuTerritory.Bricks.State
              stateIcon={artifact.stateIcon}
              stateName={artifact.stateName}
              stateType={artifact.stateType}
              type="full"
            />
          ),
        },
      ]}
      actionList={setStateActionList}
    />
  );
}

function SectionWithTerritory({ territory }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.territory} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactName={territory.territoryName}
              href={territory.uuTerritoryBaseUri}
              icon={"uubml-territory-uu"}
              artifactStateIcon={territory.artifact.stateIcon}
            />
          ),
        },
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.unit} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactData={territory.context.unit}
            />
          ),
        },
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.folder} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactData={territory.context.folder}
            />
          ),
        },
      ]}
    />
  );
}

function SectionWithResponsibleRole({ territory }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.responsible} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactData={territory.context.responsibleRole}
            />
          ),
        },
      ]}
    />
  );
}

function SectionWithBWList({ territory }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        {
          label: <UU5.Bricks.Lsi lsi={Lsi.blackAndWhite} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactData={territory.artifact.blackAndWhiteList}
            />
          ),
        },
      ]}
    />
  );
}

function SectionWithInstance({ jokes, showSeparator }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <UU5.Bricks.Lsi lsi={Lsi.awid} />, content: jokes.sysData.awidData.awid },
        { label: <UU5.Bricks.Lsi lsi={Lsi.asid} />, content: jokes.sysData.asidData.asid },
      ]}
      showSeparator={showSeparator}
    />
  );
}

function SectionWithProductInfo({ productInfoList }) {
  return <UuP.Bricks.BasicInfoSection rows={productInfoList} showSeparator={false} />;
}

function getProductInfoList(productInfoMask, jokes) {
  const asidBaseUri = jokes.territoryData.data.uuAppWorkspaceUri.replace(
    jokes.sysData.awidData.awid,
    jokes.sysData.asidData.asid
  );

  const productUris = [
    jokes.territoryData.data.uuTerritoryBaseUri,
    jokes.territoryData.data.uuAppWorkspaceUri,
    asidBaseUri,
  ];
  const productLsi = [Lsi.territory, Lsi.awid, Lsi.asid];

  let productList = [];

  productUris.map((uri, index) => {
    if (productInfoMask?.[index] === "1") {
      productList.push({
        label: <UU5.Bricks.Lsi lsi={productLsi[index]} />,
        content: `<uu5string/><div><UuProductCatalogue.Bricks.ProductInfo noSpacing baseUri="${uri}" type="10x1" noSpacing/></div>`,
      });
    }
  });

  return productList;
}
//viewOff:helpers
export default Content;
