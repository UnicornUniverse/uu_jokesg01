//@@viewOn:imports
import Uu5 from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5Elements from "uu5g05-elements";
import Category from "../../utils/category";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

function useSerieDefinitionList({ serieList = [] } = {}) {
  const categoryLsi = Uu5.useLsi(importLsi, [Category.APP_TYPE]);

  const serieDefList = [
    {
      value: Category.Keys.NAME,
      label: categoryLsi.keys.name,
      dataItem: ({ data: entityDto }) => entityDto.data.name,
      visible: "always",
    },
    {
      value: Category.Keys.ICON,
      label: categoryLsi.keys.icon,
      dataItem: ({ data: entityDto }) => <Uu5Elements.Icon icon={entityDto.data.icon} />,
    },
    {
      value: Category.Keys.SYS_CTS,
      label: categoryLsi.keys.sys.cts,
      dataItem: ({ data: entityDto }) => <Uu5Elements.DateTime value={entityDto.data.sys.cts} dateFormat="short" />,
    },
    {
      value: Category.Keys.SYS_MTS,
      label: categoryLsi.keys.sys.mts,
      dataItem: ({ data: entityDto }) => <Uu5Elements.DateTime value={entityDto.data.sys.mts} dateFormat="short" />,
      visible: false,
    },
  ];

  return Uu5Tiles.Utils.SerieList.mergeDefinitionList(serieDefList, serieList);
}

//@@viewOn:exports
export { useSerieDefinitionList };
export default useSerieDefinitionList;
//@@viewOff:exports
