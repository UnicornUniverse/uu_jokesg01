import UU5 from "uu5g04";
import UuJokes from "uu_jokesg01";

const { shallow } = UU5.Test.Tools;

describe(`UuJokes.Jokes.JokesBasicInfo`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokes.Jokes.JokesBasicInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
