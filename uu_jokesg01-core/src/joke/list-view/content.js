//@@viewOn:imports
// ISSUE Uu5Tiles - Waiting for new generation with support of uu5g05-forms
import UU5 from "uu5g04";
import { createVisualComponent, Utils, useLsi, useBackground } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import { Tile } from "./tile";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const TILE_HEIGHT = 200; // px
const CATEGORY_FILTER_KEY = "category";

// Space between rows in grid [px]
const ROW_SPACING = 8;

// Height of filter bar + infoBar for content height prediction [px]
const BARS_HEIGHT = 99;

//@@viewOn:css
const Css = {
  tile: () =>
    Config.Css.css({
      height: TILE_HEIGHT,
    }),
  gridWrapper: (background) =>
    Config.Css.css({
      // The padding around the grid (the content below the bars)
      padding: ROW_SPACING,
      "& > div > div": {
        overflow: "hidden !important",
      },
      "& > div > div:hover": {
        overflowY: "auto !important",
      },
      "& > div > div::-webkit-scrollbar": {
        width: 8,
      },
      "& > div > div::-webkit-scrollbar-thumb": {
        backgroundColor: background === "dark" ? "#ffffff" : "#616161",
        borderRadius: 4,
        border: `2px solid ${background === "dark" ? "#424242" : "#ffffff"}`,
      },
    }),
};
//@@viewOff:css

export const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.List.Properties.propTypes,
    ...Config.Types.List.AsyncData.propTypes,
    ...Config.Types.List.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.List.Properties.defaultProps,
    ...Config.Types.List.AsyncData.defaultProps,
    ...Config.Types.List.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [Content.uu5Tag]);
    const background = useBackground();
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { jokeDataList, rowCount, ...tileProps } = otherProps;
    const categoryList = props.jokesDataObject.data.categoryList;
    const pageSize = jokeDataList.pageSize;

    function handleLoad({ activeFilters, activeSorters }) {
      const criteria = getCriteria(activeFilters, activeSorters);
      props.onLoad(criteria);
    }

    function handleLoadNext({ indexFrom }) {
      props.onLoadNext({ pageSize: pageSize, pageIndex: Math.floor(indexFrom / pageSize) });
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(elementProps);
    const sorters = getSorters(lsi);

    return (
      <div {...attrs}>
        <Uu5Tiles.ControllerProvider
          data={jokeDataList.data}
          filters={getFilters(categoryList, lsi)}
          sorters={sorters}
          initialActiveSorters={[sorters.find((s) => s.key === "nameAsc")]}
          onChangeFilters={handleLoad}
          onChangeSorters={handleLoad}
        >
          {/* Update BARS_HEIGHT in case of bars setup changes */}
          <Uu5Tiles.FilterBar />
          <Uu5Tiles.InfoBar />
          <div className={Css.gridWrapper(background)}>
            <Uu5Tiles.Grid
              onLoad={handleLoadNext}
              tileMinWidth={270}
              tileMaxWidth={600}
              tileHeight={TILE_HEIGHT}
              tileSpacing={8}
              rowSpacing={ROW_SPACING}
              height={getGridHeight(rowCount)}
              emptyStateLabel={lsi.noJokes}
              virtualization
            >
              <Tile {...tileProps} className={Css.tile()} />
            </Uu5Tiles.Grid>
          </div>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getFilters(categoryList, lsi) {
  return [
    {
      key: CATEGORY_FILTER_KEY,
      label: lsi.category,
      component: (
        <UU5.Forms.Select>
          {categoryList.map((category) => (
            <UU5.Forms.Select.Option key={category.id} value={category.id} content={category.name} />
          ))}
        </UU5.Forms.Select>
      ),
      getValueLabel: (value) => categoryList.find((category) => category.id === value).name,
    },
  ];
}

function getSorters(lsi) {
  return [
    {
      key: "nameAsc",
      label: lsi.name,
      ascending: true,
      sortBy: "name",
    },
    {
      key: "nameDesc",
      label: lsi.name,
      ascending: false,
      sortBy: "name",
    },
    {
      key: "ratingAsc",
      label: lsi.rating,
      ascending: true,
      sortBy: "averageRating",
    },
    {
      key: "ratingDesc",
      label: lsi.rating,
      ascending: false,
      sortBy: "averageRating",
    },
  ];
}

function getCriteria(activeFilters, activeSorters, pageInfo) {
  const criteria = {};
  if (pageInfo) {
    criteria.pageInfo = pageInfo;
  }

  const category = activeFilters.find((filter) => filter.key === CATEGORY_FILTER_KEY);
  if (category) {
    criteria.categoryIdList = [category.value];
  }

  const [sorter] = activeSorters;

  if (sorter) {
    criteria.sortBy = sorter.sortBy;
    criteria.order = sorter.ascending ? "asc" : "desc";
  }

  return criteria;
}

function getGridHeight(rowCount) {
  return !rowCount ? null : rowCount * (TILE_HEIGHT + ROW_SPACING) - ROW_SPACING;
}

// Function returns prediction of the content height [px]
export function getContentHeight(rowCount) {
  return getGridHeight(rowCount) + BARS_HEIGHT;
}
//@@viewOff:helpers

export default Content;
