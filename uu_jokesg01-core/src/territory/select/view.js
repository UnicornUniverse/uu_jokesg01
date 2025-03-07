//@@viewOn:imports
import { createVisualComponent, useDataList, useLsi, useMemo } from "uu5g05";
import { useAwscData, usePerson, useSubAppData } from "uu_plus4u5g02";
import { Skeleton } from "uu5g05-elements";
import { TextSelect } from "uu5g05-forms";
import Config from "./config/config.js";
import DataObject from "../../utils/data-object.js";
import Calls from "calls";
import Lsi from "../../utils/lsi.js";
//@@viewOff:imports

//@@viewOn:helpers
const propTypes = { ...TextSelect.propTypes };
delete propTypes.itemList;

const defaultProps = { ...TextSelect.defaultProps };
delete defaultProps.itemList;

function getPendingItemList() {
  const itemList = [];

  // The 7 Skeleton components will use max. allowed height by filter popover.
  for (let i = 0; i <= 7; i++) {
    itemList.push({
      value: i,
      children: <Skeleton height="100%" width="100%" borderRadius="elementary" />,
      disabled: true,
    });
  }

  return itemList;
}

function getItemList(bookmarkDataList, awsc, baseUri, artifact) {
  const itemList = bookmarkDataList.data.map((bookmarkDto) => ({
    value: bookmarkDto.data.referenceUri,
    children: <BookmarkName value={bookmarkDto.data.name} />,
  }));

  if (baseUri && !itemList.find((item) => item.value === awsc.data.data.context.territory.uuTerritoryBaseUri)) {
    itemList.push({
      value: awsc.data.data.context.territory.uuTerritoryBaseUri,
      children: awsc.data.data.context.territory.name,
    });
  }

  if (!itemList.find((item) => item.value === artifact.data.context.territory.uuTerritoryBaseUri)) {
    itemList.push({
      value: artifact.data.context.territory.uuTerritoryBaseUri,
      children: artifact.data.context.territory.name,
    });
  }

  return itemList;
}

function BookmarkName({ value }) {
  const lsi = useMemo(() => Lsi.parseLsiOrPlainText(value), [value]);
  return useLsi(lsi);
}
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes,
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps,
  //@@viewOff:defaultProps

  render({ feedback, value, baseUri, artifact, ...inputProps }) {
    //@@viewOn:private
    const awsc = useAwscData();
    const personDto = usePerson();
    const subAppData = useSubAppData();

    const bookmarkDataList = useDataList(
      {
        skipInitialLoad: !DataObject.hasData(personDto),
        handlerMap: {
          load: () =>
            Calls.MyTerritory.Bookmark.listAutomated(personDto.data.systemProfileSettings.uuMyTerritoryMainBaseUri, {
              appType: "uu-businessterritory-maing01",
            }),
        },
      },
      [personDto],
    );

    const isDataLoaded = DataObject.hasData(bookmarkDataList) && (!baseUri || subAppData.data);

    function getValue() {
      if (!value) {
        return awsc.data.data.context.territory.uuTerritoryBaseUri;
      } else {
        return value;
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const itemList = useMemo(() => {
      if (!isDataLoaded) {
        return getPendingItemList();
      } else {
        return getItemList(bookmarkDataList, awsc, baseUri, artifact);
      }
    }, [bookmarkDataList, awsc, isDataLoaded, baseUri, artifact]);

    if (bookmarkDataList.state === DataObject.State.ERROR_NO_DATA) {
      feedback = "error";
    }

    return (
      <TextSelect.Input
        {...inputProps}
        itemList={itemList}
        value={isDataLoaded ? getValue() : undefined}
        pending={!isDataLoaded}
        feedback={feedback}
        disableOptionReorder
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
