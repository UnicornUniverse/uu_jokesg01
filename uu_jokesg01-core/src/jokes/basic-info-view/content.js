//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Lsi, useState, useMemo } from "uu5g05";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import "uu5g04-bricks";
import "uu_pg01-bricks";
import "uu_territoryg01-bricks";

import Config from "./config/config";
import LsiData from "./content-lsi";
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
    jokes: PropTypes.object.isRequired,
    system: PropTypes.object.isRequired,
    awsc: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    expandButton: PropTypes.bool.isRequired,
    editButtons: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onSetState: PropTypes.func.isRequired,
    bgStyle: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorSchema: PropTypes.string,
    productInfoMask: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
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
    const [isExpanded, setIsExpanded] = useState(props.expanded);

    function handlePanelIconClick() {
      setIsExpanded((isExpanded) => !isExpanded);
    }

    let productInfoList = useMemo(
      () => props.awsc && getProductInfoList(props.productInfoMask, props.awsc, props.system),
      [props.productInfoMask, props.awsc, props.system]
    );
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <UuP.Bricks.BasicInfo
        disabled={props.disabled}
        hidden={props.hidden}
        className={props.className}
        style={props.style}
        mainAttrs={props.mainAttrs}
        noIndex={props.noIndex}
        ref_={props.ref_}
      >
        <SectionHeader
          jokes={props.jokes}
          territory={props.awsc}
          jokesPermission={props.jokesPermission}
          editButtons={props.editButtons}
          onUpdate={props.onUpdate}
        />
        {props.awsc && (
          <>
            <SectionWithExpandButton
              isExpanded={isExpanded}
              expandButton={props.expandButton}
              handlePanelIconClick={handlePanelIconClick}
            />
            {
              // FIXME MFA Change Panel
            }
            <UU5.Bricks.Panel
              bgStyleHeader="transparent"
              expanded={isExpanded}
              className={Css.panelHeader()}
              header=" "
            >
              <SectionWithType artifact={props.awsc.data.artifact} />
              <SectionWithState
                artifact={props.awsc.data.artifact}
                jokesPermission={props.jokesPermission}
                editButtons={props.editButtons}
                onSetState={props.onSetState}
              />
              <SectionWithTerritory territory={props.awsc.data} />
              <SectionWithResponsibleRole territory={props.awsc.data} />
              <SectionWithBWList territory={props.awsc.data} />
              <SectionWithInstance system={props.system} showSeparator={productInfoList.length !== 0} />
              <SectionWithProductInfo productInfoList={productInfoList} />
            </UU5.Bricks.Panel>
          </>
        )}
      </UuP.Bricks.BasicInfo>
    );
    //@@viewOff:render
  },
});
//viewOn:helpers
function SectionHeader({ jokes, territory, jokesPermission, onUpdate, editButtons }) {
  const updateActionList =
    jokesPermission.jokes.canUpdate() && editButtons ? [{ icon: "mdi-pencil", onClick: onUpdate }] : [];

  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <Lsi lsi={LsiData.name} />, content: jokes.name },
        { label: <Lsi lsi={LsiData.code} />, content: territory?.data?.artifact.code },
        { label: <Lsi lsi={LsiData.id} />, content: jokes.id },
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
        { label: <Lsi lsi={LsiData.type} />, content: artifact.typeName },
        { label: <Lsi lsi={LsiData.category} />, content: artifact.category },
        { label: <Lsi lsi={LsiData.revision} />, content: artifact.revision },
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
          label: <Lsi lsi={LsiData.state} />,
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
          label: <Lsi lsi={LsiData.territory} />,
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
          label: <Lsi lsi={LsiData.unit} />,
          content: (
            <UuTerritory.Bricks.ArtifactLink
              territoryBaseUri={territory.uuTerritoryBaseUri}
              artifactData={territory.context.unit}
            />
          ),
        },
        {
          label: <Lsi lsi={LsiData.folder} />,
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
          label: <Lsi lsi={LsiData.responsible} />,
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
          label: <Lsi lsi={LsiData.blackAndWhite} />,
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

function SectionWithInstance({ system, showSeparator }) {
  return (
    <UuP.Bricks.BasicInfoSection
      rows={[
        { label: <Lsi lsi={LsiData.awid} />, content: system.awidData.awid },
        { label: <Lsi lsi={LsiData.asid} />, content: system.asidData.asid },
      ]}
      showSeparator={showSeparator}
    />
  );
}

function SectionWithProductInfo({ productInfoList }) {
  return <UuP.Bricks.BasicInfoSection rows={productInfoList} showSeparator={false} />;
}

function getProductInfoList(productInfoMask, territory, system) {
  const asidBaseUri = territory.data.uuAppWorkspaceUri.replace(system.awidData.awid, system.asidData.asid);

  const productUris = [territory.data.uuTerritoryBaseUri, territory.data.uuAppWorkspaceUri, asidBaseUri];
  const productLsi = [LsiData.territory, LsiData.awid, LsiData.asid];

  let productList = [];

  productUris.map((uri, index) => {
    if (productInfoMask?.[index] === "1") {
      productList.push({
        label: <Lsi lsi={productLsi[index]} />,
        content: `<uu5string/><div><UuProductCatalogue.Bricks.ProductInfo noSpacing baseUri="${uri}" type="10x1" noSpacing/></div>`,
      });
    }
  });

  return productList;
}
//viewOff:helpers
export default Content;
