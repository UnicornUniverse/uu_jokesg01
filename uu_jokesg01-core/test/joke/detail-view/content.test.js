import UU5 from "uu5g04";
import { shallow, mount, wait } from "uu5g05-test";
import Content from "../../../src/joke/detail-view/content.js";

const jokeDataObject = {
  state: "ready",
  data: {
    id: "123",
    name: "Test joke",
    visibility: false,
    text: "Best joke ever",
    imageUrl: "https://via.placeholder.com/300x300",
    image: "1234",
    ratingCount: 5,
    averageRating: 2.5,
    categoryIdList: ["1", "2"],
    sys: {
      cts: "2020-01-01T00:00:00.000Z",
    },
  },
};

const jokesPermission = {
  joke: {
    canAddRating: () => true,
    canManage: () => true,
  },
};

const jokesDataObject = {
  state: "ready",
  data: {
    categoryList: [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
      { id: "3", name: "Category 3" },
    ],
  },
};

const parentStyle = {
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 8,
  paddingBottom: 8,
};

describe(`UuJokesCore.Joke.DetailView.Content`, () => {
  it(`default props`, () => {
    const wrapper = shallow(
      <Content
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        parentStyle={parentStyle}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`onAddRating callback`, async () => {
    const handleAddRating = jest.fn(() => null);

    const jokesPermission = {
      joke: {
        canAddRating: () => false,
        canManage: () => true,
      },
    };

    const wrapper = mount(
      <Content
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        parentStyle={parentStyle}
        onAddRating={handleAddRating}
      />
    );

    const ratingElement = wrapper.find(UU5.Bricks.Icon).first();
    ratingElement.simulate("click");

    await wait();
    expect(handleAddRating).toHaveBeenCalledTimes(0);
  });

  it(`no add rating permission`, async () => {
    const handleAddRating = jest.fn(() => null);

    const wrapper = mount(
      <Content
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        parentStyle={parentStyle}
        onAddRating={handleAddRating}
      />
    );

    const ratingElement = wrapper.find(UU5.Bricks.Icon).first();
    ratingElement.simulate("click");

    await wait();
    expect(handleAddRating).toHaveBeenCalledTimes(1);
  });
});
