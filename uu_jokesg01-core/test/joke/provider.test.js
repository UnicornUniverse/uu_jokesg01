import { mount, omitConsoleLogs, wait } from "uu5g05-test";
import { Client } from "uu_appg01";
import { useJoke } from "../../src/joke/context.js";
import Provider from "../../src/joke/provider.js";

const joke = {
  id: "123",
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

const jokeWithImage = { ...joke, image: "1234" };
const anotherJoke = { ...joke, id: "789" };

const ContextReader = ({ children }) => {
  const value = useJoke();
  return children(value);
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://localhost/123");
  global.URL.revokeObjectURL = jest.fn();
});

describe(`UuJokesCore.Joke.Provider - `, () => {
  it(`default props`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: joke })); // joke/get
    const children = jest.fn();

    mount(<Provider oid={joke.id}>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`context`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: joke })); // joke/get

    const children = jest.fn(() => null);

    mount(
      <Provider oid={joke.id}>
        <ContextReader>{children}</ContextReader>
      </Provider>
    );
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`reload`, async () => {
    Client.get.mockImplementation((uri, dtoIn) => ({ data: dtoIn.id === "123" ? joke : anotherJoke })); // joke/get
    const children = jest.fn();

    const wrapper = mount(<Provider oid={joke.id}>{children}</Provider>);
    await wait();
    wrapper.setProps({ oid: "789" });
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`reload with error`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: joke })); // joke/get
    Client.get.mockImplementationOnce(() => {
      throw new Error("Test reload with error");
    }); // joke/get
    const children = jest.fn();

    omitConsoleLogs("Error while reloading data.");
    const wrapper = mount(<Provider oid={joke.id}>{children}</Provider>);
    await wait();
    wrapper.setProps({ oid: "789" });
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`joke with image`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: jokeWithImage })); // joke/get
    Client.get.mockImplementationOnce(() => new Blob()); // uu-app-binarystore/getBinaryData
    const children = jest.fn();

    mount(<Provider oid={jokeWithImage.id}>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`NoOidError`, async () => {
    const children = jest.fn();

    omitConsoleLogs("Failed prop type");
    omitConsoleLogs("NoOidError");
    mount(<Provider>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`update`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: jokeWithImage })); // joke/get
    Client.get.mockImplementationOnce(() => new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockImplementationOnce((uri, dtoIn) => ({ data: { ...jokeWithImage, ...dtoIn } })); // joke/update

    const children = jest.fn(
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

    mount(<Provider oid={jokeWithImage.id}>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`addRating`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: jokeWithImage })); // joke/get
    Client.get.mockImplementationOnce(() => new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockImplementationOnce(() => ({ data: { ...jokeWithImage, ratingCount: 6, averageRating: 3 } })); // joke/update

    const children = jest.fn(
      ({ jokeDataObject }) =>
        Client.post.mock.calls.length === 0 &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap.addRating(5)
    );

    mount(<Provider oid={jokeWithImage.id}>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });

  it(`updateVisibility`, async () => {
    Client.get.mockImplementationOnce(() => ({ data: jokeWithImage })); // joke/get
    Client.get.mockImplementationOnce(() => new Blob()); // uu-app-binarystore/getBinaryData
    Client.post.mockImplementationOnce((uri, dtoIn) => ({
      data: { ...jokeWithImage, visibility: dtoIn.visibility },
    })); // joke/update

    const children = jest.fn(
      ({ jokeDataObject }) =>
        Client.post.mock.calls.length === 0 &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap.updateVisibility(true)
    );

    mount(<Provider oid={jokeWithImage.id}>{children}</Provider>);
    await wait();

    expect(children.mock.lastCall[0]).toMatchSnapshot();
  });
});
