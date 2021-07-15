//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import { JokeListTile, TILE_HEIGHT } from "./joke-list-tile";
import Lsi from "./joke-list-content-lsi";
//@@viewOff:imports

const CATEGORY_FILTER_KEY = "category";
const ROW_SPACING = 8;

const gridWrapperCss = () => Config.Css.css`padding: 8px`;

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
    baseUri: UU5.PropTypes.string,
    jokesPermission: UU5.PropTypes.object.isRequired,
    rowCount: UU5.PropTypes.number,
    onCopyComponent: UU5.PropTypes.func,
    onLoad: UU5.PropTypes.func,
    onLoadNext: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
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
    rowCount: undefined,
    showCopyComponent: false,
    onCopyComponent: () => {},
    onLoad: () => {},
    onLoadNext: () => {},
    onReload: () => {},
    onCreate: () => {},
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleLoad({ activeFilters, activeSorters }) {
      const criteria = getCriteria(activeFilters, activeSorters);
      props.onLoad(criteria);
    }

    // function handleLoadNext({ pageInfo }) {
    //   props.onLoadNext(pageInfo);
    // }

    function handleLoadNext({ indexFrom }) {
      props.onLoadNext({ pageSize: props.pageSize, pageIndex: Math.floor(indexFrom / props.pageSize) });
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    function Tile({ data }) {
      return (
        <JokeListTile
          jokeDataItem={data}
          jokesPermission={props.jokesPermission}
          baseUri={props.baseUri}
          onDetail={props.onDetail}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
          onAddRating={props.onAddRating}
          onUpdateVisibility={props.onUpdateVisibility}
        />
      );
    }

    return (
      <Uu5Tiles.ControllerProvider
        data={props.data}
        filters={getFilters(props.categoryList)}
        sorters={getSorters()}
        onChangeFilters={handleLoad}
        onChangeSorters={handleLoad}
        nestingLevel={currentNestingLevel}
        attrs={attrs}
      >
        <Uu5Tiles.ActionBar searchable={false} actions={getActions(props)} />
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.InfoBar />
        <div className={gridWrapperCss()}>
          <Uu5Tiles.Grid
            // data={props.data?.filter((item) => item != null)}
            onLoad={handleLoadNext}
            tileMinWidth={270}
            tileMaxWidth={600}
            tileHeight={TILE_HEIGHT}
            tileSpacing={8}
            rowSpacing={ROW_SPACING}
            height={!props.rowCount ? null : props.rowCount * (TILE_HEIGHT + ROW_SPACING) - ROW_SPACING}
            emptyStateLabel={Lsi.noJokes}
            virtualization
          >
            {Tile}
          </Uu5Tiles.Grid>
        </div>
        {/* <PagingAutoLoad
          data={props.data}
          handleLoad={handleLoadNext}
          distance={window.innerHeight}
          pageSize={props.pageSize}
        /> */}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions({ jokesPermission, onCreate, onReload, onCopyComponent, showCopyComponent }) {
  const actionList = [];

  if (jokesPermission.joke.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      active: true,
      onClick: onCreate,
      bgStyle: "filled",
      colorSchema: "primary",
    });
  }

  actionList.push({
    icon: "mdi-reload",
    active: true,
    onClick: onReload,
    bgStyle: "outline",
    colorSchema: "primary",
  });

  if (showCopyComponent) {
    actionList.push({
      content: Lsi.copyComponent,
      onClick: onCopyComponent,
    });
  }

  return actionList;
}

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
