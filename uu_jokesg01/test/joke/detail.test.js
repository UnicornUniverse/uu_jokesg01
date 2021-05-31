import UU5 from "uu5g04";
import UuJokes from "uu_jokesg01";

const { shallow } = UU5.Test.Tools;

describe(`UuJokes.Joke.Detail`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokes.Joke.Detail />);
    expect(wrapper).toMatchSnapshot();
  });
});
