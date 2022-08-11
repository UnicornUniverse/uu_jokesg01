import { mount, wait } from "uu5g05-test";
import Header from "../../../src/joke/detail-view/header.js";

describe(`UuJokesCore.Joke.DetailView.Header`, () => {
  it(`with joke prop`, async () => {
    const joke = {
      name: "Test joke",
      visibility: false,
    };

    const wrapper = mount(<Header joke={joke} />);

    await wait();
    expect(wrapper).toMatchSnapshot();
  });
});
