import { Test, VisualComponent } from "uu5g05-test";
import Header from "../../../src/joke/detail-view/header.js";
import enLsi from "../../../src/lsi/en.json";

const { screen } = Test;
const lsi = enLsi[Header.uu5Tag];

function getDefaultProps() {
  return {
    joke: {
      name: "Test joke",
      visibility: false,
    },
  };
}

async function setup(props, options) {
  return VisualComponent.setup(Header, { ...getDefaultProps(), ...props }, options);
}

describe(`UuJokesCore.Joke.DetailView.Header`, () => {
  VisualComponent.testProperties(setup);

  it(`it renders name and visibility icon`, async () => {
    const { props } = await setup();

    expect(screen.getByText(props.joke.name, { exact: false })).toBeVisible();
    expect(screen.getByTitle(lsi.unpublished)).toBeVisible();
  });

  it(`it renders only name`, async () => {
    const props = getDefaultProps();
    props.joke.visibility = true;
    await setup(props);

    expect(screen.getByText(props.joke.name, { exact: false })).toBeVisible();
    expect(screen.queryByTitle(lsi.unpublished)).not.toBeInTheDocument();
  });
});
