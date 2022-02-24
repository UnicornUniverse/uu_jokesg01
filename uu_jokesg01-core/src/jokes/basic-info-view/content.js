//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useMemo } from "uu5g05";
import { Block } from "uu5g05-elements";
import UuP from "uu_pg01";
import UuTerritory from "uu_territoryg01";
import "uu5g04-bricks";
import "uu_pg01-bricks";
import "uu_territoryg01-bricks";

import Config from "./config/config";
import LsiData from "./content-lsi";
//@@viewOff:imports

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
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BasicInfo.AsyncData.propTypes,
    ...Config.Types.BasicInfo.Internals.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BasicInfo.AsyncData.defaultProps,
    ...Config.Types.BasicInfo.Internals.defaultProps,
    ...Config.Types.BasicInfo.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const jokes = props.jokesDataObject.data;
    const awsc = props.awscDataObject.data;
    const system = props.systemDataObject.data;

    let productInfoList = useMemo(
      () => awsc && getProductInfoList(props.productInfoMask, awsc, system),
      [props.productInfoMask, awsc, system]
    );
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
        <UuP.Bricks.BasicInfo>
          <SectionHeader
            jokes={jokes}
            territory={awsc}
            jokesPermission={props.jokesPermission}
            editButtons={props.editButtons}
            onUpdate={props.onUpdate}
          />
          {awsc && (
            <>
              <Block
                significance="distinct"
                initialCollapsed={!props.expanded}
                className={Css.panelHeader()}
                collapsible={true}
              >
                <SectionWithType artifact={awsc.data.artifact} />
                <SectionWithState
                  artifact={awsc.data.artifact}
                  jokesPermission={props.jokesPermission}
                  editButtons={props.editButtons}
                  onSetState={props.onSetState}
                />
                <SectionWithTerritory territory={awsc.data} />
                <SectionWithResponsibleRole territory={awsc.data} />
                <SectionWithBWList territory={awsc.data} />
                <SectionWithInstance system={system} showSeparator={productInfoList.length !== 0} />
                <SectionWithProductInfo productInfoList={productInfoList} />
              </Block>
            </>
          )}
        </UuP.Bricks.BasicInfo>
      </div>
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
