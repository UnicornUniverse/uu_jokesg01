//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PagingAutoLoad } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import JokeListTile from "./joke-list-tile";
import Lsi from "./joke-list-content-lsi";
//@@viewOff:imports

const CATEGORY_FILTER_KEY = "category";

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeListContent",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const JokeListContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.array.isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    pageSize: UU5.PropTypes.number.isRequired,
    baseUri: UU5.PropTypes.string.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    onLoad: UU5.PropTypes.func,
    onLoadNext: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    data: undefined,
    categoryList: undefined,
    pageSize: undefined,
    baseUri: undefined,
    jokesPermission: undefined,
    onLoad: () => {},
    onLoadNext: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    const filters = getFilters(props.categoryList);
    const sorters = getSorters();

    function handleLoad({ activeFilters, activeSorters }) {
      const criteria = getCriteria(activeFilters, activeSorters);
      props.onLoad(criteria);
    }

    function handleLoadNext({ pageInfo }) {
      props.onLoadNext(pageInfo);
    }

    function Tile({ data }) {
      const joke = data.data;

      return (
        <JokeListTile
          joke={joke}
          baseUri={props.baseUri}
          onDelete={props.onDelete}
          onAddRating={props.onAddRating}
          onUpdateVisibility={props.onUpdateVisibility}
          canManage={props.jokesPermission.joke.canManage(joke)}
        />
      );
    }

    return (
      <Uu5Tiles.ControllerProvider
        data={props.data}
        filters={filters}
        sorters={sorters}
        onChangeFilters={handleLoad}
        onChangeSorters={handleLoad}
        nestingLevel={currentNestingLevel}
        attrs={attrs}
      >
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.InfoBar />
        <Uu5Tiles.Grid
          virtualization
          data={props.data?.filter((item) => item != null)}
          tileMinWidth={200}
          tileMaxWidth={400}
          tileSpacing={8}
          rowSpacing={8}
        >
          {Tile}
        </Uu5Tiles.Grid>
        <PagingAutoLoad
          data={props.data}
          handleLoad={handleLoadNext}
          distance={window.innerHeight}
          pageSize={props.pageSize}
        />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getFilters(categoryList) {
  return [
    {
      key: CATEGORY_FILTER_KEY,
      label: Lsi.category,
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

function getSorters() {
  return [
    {
      key: "nameAsc",
      label: Lsi.name,
      ascending: true,
      sortBy: "name",
    },
    {
      key: "nameDesc",
      label: Lsi.name,
      ascending: false,
      sortBy: "name",
    },
    {
      key: "ratingAsc",
      label: Lsi.rating,
      ascending: true,
      sortBy: "rating",
    },
    {
      key: "ratingDesc",
      label: Lsi.rating,
      ascending: false,
      sortBy: "rating",
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
    criteria.categoryList = [category.value];
  }

  const [sorter] = activeSorters;

  if (sorter) {
    criteria.sortBy = sorter.sortBy;
    criteria.order = sorter.ascending ? "asc" : "desc";
  }

  return criteria;
}
//@@viewOff:helpers

export default JokeListContent;
