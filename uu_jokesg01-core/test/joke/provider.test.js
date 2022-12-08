import { Client } from "uu_appg01";
import { omitConsoleLogs, wait } from "uu5g05-test";
import { render } from "../tools";
import { useJoke } from "../../src/joke/context.js";
import Provider from "../../src/joke/provider.js";

const categoryList = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
];

const updatedCategoryList = [
  { id: "7", name: "Category 7" },
  { id: "8", name: "Category 8" },
];

const joke = {
  id: "joke-1",
  name: "Test joke",
  visibility: false,
  text: "Best joke ever",
  ratingCount: 5,
  averageRating: 2.5,
  categoryIdList: ["1", "2"],
  sys: {
    cts: "2020-01-01T00:00:00.000Z",
  },
};

const jokeWithImage = { ...joke, id: "joke-with-image-1", image: "image-1" };
const anotherJoke = { ...joke, id: "another-joke-1" };

function getDefaultProps() {
  return { baseUri: "http://localhost", oid: "joke-1", children: jest.fn() };
}

const ContextReader = ({ children }) => {
  const value = useJoke();
  return children(value);
};

async function setup(props = getDefaultProps()) {
  global.URL.createObjectURL = jest.fn(() => "http://localhost/123");
  global.URL.revokeObjectURL = jest.fn();

  const view = render(<Provider {...props} />);
  await wait();
  return { props, view };
}

describe("UuJokesCore.Joke.Provider", () => {
  it(`reads data through children as a function`, async () => {
    Client.get.mockReturnValueOnce({ data: joke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    const { props } = await setup();
    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`reads data throw context`, async () => {
    Client.get.mockReturnValueOnce({ data: joke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    const props = getDefaultProps();
    const consumer = jest.fn(() => null);
    props.children = <ContextReader>{consumer}</ContextReader>;
    await setup(props);

    expect(consumer.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`rerenders component with different oid`, async () => {
    Client.get.mockReturnValueOnce({ data: joke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    Client.get.mockReturnValueOnce({ data: anotherJoke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list

    const { view, props } = await setup();

    view.rerender(<Provider {...props} oid="another-joke-1" />);
    await wait();

    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`reload with error`, async () => {
    Client.get.mockReturnValueOnce({ data: joke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    const { view, props } = await setup();

    Provider.logger.error = jest.fn();
    Client.get.mockImplementationOnce(() => {
      throw new Error("Test reload with error");
    }); // joke/get

    view.rerender(<Provider {...props} oid={"789"} />);
    await wait();

    expect(Provider.logger.error).toBeCalledTimes(1);
    expect(Provider.logger.error.mock.lastCall).toMatchSnapshot("logger");
    expect(props.children.mock.lastCall[0]).toMatchSnapshot("children");
  });

  it(`loads joke with image`, async () => {
    Client.get.mockReturnValueOnce({ data: joke }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    Client.get.mockReturnValueOnce(new Blob()); // uu-app-binarystore/getBinaryData

    const props = { ...getDefaultProps(), oid: jokeWithImage.id };
    await setup(props);

    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`renders component without required oid property`, async () => {
    const props = { ...getDefaultProps(), oid: undefined };
    omitConsoleLogs("The prop `oid` is marked as required");
    omitConsoleLogs("NoOidError: The required property oid is not defined!");
    await setup(props);

    expect(props.children.mock.lastCall[0]).toMatchSnapshot("children");
  });

  it(`updates joke`, async () => {
    Client.get.mockReturnValueOnce({ data: jokeWithImage }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    Client.get.mockReturnValueOnce(new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockImplementationOnce((uri, dtoIn) => ({ data: { ...jokeWithImage, ...dtoIn } })); // joke/update
    Client.get.mockReturnValueOnce({ data: { itemList: updatedCategoryList } }); // category/list

    const props = getDefaultProps();
    props.children.mockImplementation(
      ({ jokeDataObject }) =>
        Client.post.mock.calls.length === 0 &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap.update({
          name: "New name",
          text: "New text",
          categoryIdList: ["7", "8"],
          image: "456",
        })
    );

    await setup(props);

    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`addRating`, async () => {
    Client.get.mockReturnValueOnce({ data: jokeWithImage }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    Client.get.mockReturnValueOnce(new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockReturnValueOnce({ data: { ...jokeWithImage, ratingCount: 6, averageRating: 3 } }); // joke/update

    const props = getDefaultProps();
    props.children.mockImplementation(
      ({ jokeDataObject }) =>
        Client.post.mock.calls.length === 0 &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap.addRating(5)
    );

    await setup(props);

    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`updates visibility`, async () => {
    Client.get.mockReturnValueOnce({ data: jokeWithImage }); // joke/get
    Client.get.mockReturnValueOnce({ data: { itemList: categoryList } }); // category/list
    Client.get.mockReturnValueOnce(new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockImplementationOnce((uri, dtoIn) => ({
      data: { ...jokeWithImage, visibility: dtoIn.visibility },
    })); // joke/update

    const props = getDefaultProps();
    props.children.mockImplementation(
      ({ jokeDataObject }) =>
        Client.post.mock.calls.length === 0 &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap.updateVisibility(true)
    );

    await setup(props);

    expect(props.children.mock.lastCall[0]).toMatchSnapshot();
  });
});
