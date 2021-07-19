import UU5 from "uu5g04";
import UuJokesCore from "uu_jokesg01-core";

const { shallow } = UU5.Test.Tools;

describe(`UuJokesCore.Category.CategoryListTile`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuJokesCore.Category.CategoryListTile />);
    expect(wrapper).toMatchSnapshot();
  });
});
