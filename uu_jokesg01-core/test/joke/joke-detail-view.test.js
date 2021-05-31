import UU5 from "uu5g04";
import UuJokesCore from "uu_jokesg01-core";

const { shallow } = UU5.Test.Tools;

describe(`UuJokesCore.Joke.JokeDetailView`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokesCore.Joke.JokeDetailView />);
    expect(wrapper).toMatchSnapshot();
  });
});
