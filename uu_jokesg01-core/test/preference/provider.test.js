import UU5 from "uu5g04";
import UuJokesCore from "uu_jokesg01-core";

const { shallow } = UU5.Test.Tools;

describe(`UuJokesCore.Preference.Provider`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokesCore.Preference.Provider />);
    expect(wrapper).toMatchSnapshot();
  });
});
