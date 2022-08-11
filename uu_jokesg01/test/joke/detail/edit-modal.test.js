import { mount, wait } from "uu5g05-test";
import { Button, MenuItem } from "uu5g05-elements";
import Detail from "../../../src/joke/detail";
import EditModal from "../../../src/joke/detail/edit-modal";
import Uu5Editing from "uu5g05-editing";

describe(`UuJokes.Joke.Detail.EditModal`, () => {
  it(`checks props passed to children`, async () => {
    const props = {
      componentType: Detail,
      componentProps: { oid: "joke-1" },
      onSave: () => {},
      onClose: () => {},
      onReady: () => {},
    };

    const spy = jest.spyOn(Uu5Editing, "EditModal");
    const Fallback = jest.fn(() => <div>Loading...</div>);

    mount(<EditModal {...props} fallback={<Fallback />} />);
    await wait();

    expect(spy.mock.lastCall[0]).toMatchSnapshot();
    expect(Fallback).toHaveBeenCalledTimes(1);
  });

  it(`opens advanced settings`, async () => {
    const props = {
      componentType: Detail,
      componentProps: { oid: "joke-1" },
      onSave: () => {},
      onClose: () => {},
      onReady: () => {},
    };

    const Fallback = jest.fn(() => <div>Loading...</div>);
    const wrapper = mount(<EditModal {...props} fallback={<Fallback />} />);
    await wait();

    wrapper
      .find(MenuItem)
      .findWhere((node) => node.text() === "Advanced settings")
      .first()
      .simulate("click");
    await wait();

    expect(wrapper.contains("Heading size")).toBe(true);
  });

  it(`saves props`, async () => {
    const props = {
      componentType: Detail,
      componentProps: { oid: "joke-1", baseUri: "http://localhost" },
      onSave: jest.fn(),
      onClose: () => {},
      onReady: () => {},
    };

    const Fallback = jest.fn(() => <div>Loading...</div>);
    const wrapper = mount(<EditModal {...props} fallback={<Fallback />} />);
    await wait();

    wrapper
      .find(Button)
      .findWhere((node) => node.contains("Save"))
      .first()
      .simulate("click");
    await wait();

    expect(props.onSave).toHaveBeenCalledTimes(1);
  });
});
