import { render, screen } from "../../tools";
import Header from "../../../src/joke/detail-view/header.js";
import enLsi from "../../../src/lsi/en.json";

const lsi = enLsi[Header.uu5Tag];

function getDefaultProps() {
  return {
    joke: {
      name: "Test joke",
      visibility: false,
    },
  };
}

function setup(props = getDefaultProps()) {
  render(<Header {...props} />);
  return { props };
}

describe(`UuJokesCore.Joke.DetailView.Header`, () => {
  it(`it renders name and visibility icon`, async () => {
    const { props } = setup();

    expect(screen.getByText(props.joke.name, { exact: false })).toBeVisible();
    expect(screen.getByTitle(lsi.unpublished)).toBeVisible();
  });

  it(`it renders only name`, async () => {
    const props = getDefaultProps();
    props.joke.visibility = true;
    setup(props);

    expect(screen.getByText(props.joke.name, { exact: false })).toBeVisible();
    expect(screen.queryByTitle(lsi.unpublished)).not.toBeInTheDocument();
  });
});
