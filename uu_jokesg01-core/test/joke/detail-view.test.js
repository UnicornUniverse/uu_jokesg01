import { shallow, mount, wait, act, omitConsoleLogs } from "uu5g05-test";
import DetailView from "../../src/joke/detail-view.js";
import AreaView from "../../src/joke/detail-view/area-view.js";
import BoxView from "../../src/joke/detail-view/box-view.js";
import DetailModal from "../../src/joke/detail-view/detail-modal.js";
import InlineView from "../../src/joke/detail-view/inline-view.js";
import PreferenceModal from "../../src/joke/detail-view/preference-modal.js";
import SpotView from "../../src/joke/detail-view/spot-view.js";
import UpdateModal from "../../src/joke/detail-view/update-modal.js";

let mockChildren;

jest.mock("../../src/joke/detail-view/detail-modal.js", () => (props) => {
  return <button id="closeDetail" onClick={props.onClose} />;
});

jest.mock("../../src/joke/detail-view/update-modal.js", () => (props) => {
  return (
    <>
      <button
        id="submit"
        onClick={() => {
          props.jokeDataObject.handlerMap.update();
          props.onSaveDone();
        }}
      />
      <button id="cancel" onClick={props.onCancel} />
    </>
  );
});

jest.mock("../../src/joke/detail-view/preference-modal.js", () => (props) => {
  return (
    <>
      <button
        id="submit"
        onClick={() => {
          props.preferenceDataObject.handlerMap.save();
          props.onSaveDone();
        }}
      />
      <button id="cancel" onClick={props.onCancel} />
    </>
  );
});

jest.mock("../../src/joke/detail-view/area-view.js", () => (props) => {
  mockChildren(props);

  return (
    <>
      <button id="openDetail" onClick={props.onDetail} />
      <button id="openDetailToNewTab" onClick={() => props.onDetail({ isNewTab: true })} />
      <button id="update" onClick={props.actionList.find((i) => i.icon === "mdi-pencil")?.onClick} />
      <button id="publish" onClick={props.actionList.find((i) => i.icon === "mdi-eye")?.onClick} />
      <button id="unpublish" onClick={props.actionList.find((i) => i.icon === "mdi-eye-off")?.onClick} />
      <button id="configure" onClick={props.actionList.find((i) => i.icon === "mdi-settings")?.onClick} />
      <button id="reload" onClick={props.actionList.find((i) => i.icon === "mdi-sync")?.onClick} />
      <button id="copyComponent" onClick={props.actionList.find((i) => i.icon === "mdi-content-copy")?.onClick} />
      <button id="addRating" onClick={props.onAddRating} />
    </>
  );
});

const joke = {
  id: "123",
  name: "Test joke",
  visibility: false,
  text: "Best joke ever",
  imageUrl: "https://via.placeholder.com/300x300",
  image: "1234",
  ratingCount: 5,
  averageRating: 2.5,
  categoryIdList: ["1", "2"],
  sys: {
    cts: "2020-01-01T00:00:00.000Z",
  },
};

const jokeDataObject = {
  state: "ready",
  data: joke,
};

const jokesPermission = {
  joke: {
    canAddRating: () => true,
    canManage: () => true,
    canUpdateVisibility: () => true,
  },
};

const jokesDataObject = {
  state: "ready",
  data: {
    categoryList: [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
      { id: "3", name: "Category 3" },
    ],
  },
};

const awscDataObject = {
  state: "ready",
  data: {
    data: {
      artifact: {
        uuAppWorkspaceUri: "",
      },
    },
  },
};

const preferenceDataObject = {
  state: "ready",
  data: {
    showCategories: true,
    showAuthor: true,
    showCreationTime: true,
    disableUserPreference: false,
  },
};

beforeEach(() => {
  mockChildren = jest.fn();

  jokesDataObject.handlerMap = {
    load: jest.fn(),
  };

  jokeDataObject.handlerMap = {
    load: jest.fn(),
    update: jest.fn(),
    updateVisibility: jest.fn(),
    addRating: jest.fn(),
  };

  preferenceDataObject.handlerMap = {
    load: jest.fn(),
    save: jest.fn(),
  };
});

describe(`UuJokesCore.Joke.DetailView`, () => {
  it(`default props`, () => {
    const wrapper = shallow(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper.find(AreaView)).toHaveLength(1);
  });

  it(`box nesting level`, () => {
    const wrapper = shallow(
      <DetailView
        nestingLevel="box"
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper.find(BoxView)).toHaveLength(1);
  });

  it(`spot nesting level`, () => {
    const wrapper = shallow(
      <DetailView
        nestingLevel="spot"
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper.find(SpotView)).toHaveLength(1);
  });

  it(`inline nesting level`, () => {
    const wrapper = shallow(
      <DetailView
        nestingLevel="inline"
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper.find(InlineView)).toHaveLength(1);
  });

  it(`update`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#update").simulate("click");

    expect(wrapper.find(UpdateModal)).toHaveLength(1);

    wrapper.find("#submit").simulate("click");

    expect(jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(1);
    expect(wrapper.find(UpdateModal)).toHaveLength(0);
  });

  it(`update with cancel`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#update").simulate("click");

    expect(wrapper.find(UpdateModal)).toHaveLength(1);

    wrapper.find("#cancel").simulate("click");

    expect(jokeDataObject.handlerMap.update).toHaveBeenCalledTimes(0);
  });

  it(`save preferences`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#configure").simulate("click");

    expect(wrapper.find(PreferenceModal)).toHaveLength(1);

    wrapper.find("#submit").simulate("click");

    expect(preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(1);
  });

  it(`save preferences with cancel`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#configure").simulate("click");

    expect(wrapper.find(PreferenceModal)).toHaveLength(1);

    wrapper.find("#cancel").simulate("click");

    expect(preferenceDataObject.handlerMap.save).toHaveBeenCalledTimes(0);
  });

  it(`open and close detail`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#openDetail").simulate("click");

    expect(wrapper.find(DetailModal)).toHaveLength(1);

    wrapper.find("#closeDetail").simulate("click");

    expect(wrapper.find(DetailModal)).toHaveLength(0);
  });

  it(`open detail to new tab`, async () => {
    const handleOpenToNewTab = jest.fn();

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
        onOpenToNewTab={handleOpenToNewTab}
      />
    );

    wrapper.find("#openDetailToNewTab").simulate("click");

    expect(handleOpenToNewTab).toHaveBeenCalledTimes(1);
  });

  it(`reload`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    act(() => {
      wrapper.find("#reload").simulate("click");
    });

    await wait();

    expect(jokesDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
    expect(jokeDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
    expect(preferenceDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
  });

  it(`reload with error`, async () => {
    jokesDataObject.handlerMap.load.mockImplementationOnce(() => {
      throw new Error("Test reload with error");
    });

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    act(() => {
      omitConsoleLogs("Test reload with error");
      wrapper.find("#reload").simulate("click");
    });

    await wait();

    expect(jokesDataObject.handlerMap.load).toHaveBeenCalledTimes(1);
  });

  it(`add rating`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#addRating").simulate("click");

    expect(jokeDataObject.handlerMap.addRating).toHaveBeenCalledTimes(1);
  });

  it(`add rating with error`, async () => {
    jokeDataObject.handlerMap.addRating.mockImplementationOnce(() => {
      throw new Error("Test add rating with errror");
    });

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    omitConsoleLogs("Test add rating with errror");
    wrapper.find("#addRating").simulate("click");

    expect(jokeDataObject.handlerMap.addRating).toHaveBeenCalledTimes(1);
  });

  it(`publish`, async () => {
    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#publish").simulate("click");

    expect(jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
    expect(jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledWith(true);
  });

  it(`publish with error`, async () => {
    jokeDataObject.handlerMap.updateVisibility.mockImplementationOnce(() => {
      throw new Error("Test update visibility with error");
    });

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    omitConsoleLogs("Test update visibility with error");
    wrapper.find("#publish").simulate("click");

    expect(jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
  });

  it(`unpublish`, async () => {
    const customJokeDataObject = {
      ...jokeDataObject,
      data: {
        ...joke,
        visibility: true,
      },
    };

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={customJokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    wrapper.find("#unpublish").simulate("click");

    expect(jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledTimes(1);
    expect(jokeDataObject.handlerMap.updateVisibility).toHaveBeenCalledWith(false);
  });

  it(`copy component`, async () => {
    const handleCopyComponent = jest.fn(() => "<div>Test copy component</div>");

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
        onCopyComponent={handleCopyComponent}
      />
    );

    wrapper.find("#copyComponent").simulate("click");

    expect(handleCopyComponent).toHaveBeenCalledTimes(1);
  });

  it(`data are not loaded`, async () => {
    const customJokeDataObject = {
      state: "pendingNoData",
      data: null,
    };

    mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={customJokeDataObject}
        jokesPermission={jokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(mockChildren).toHaveBeenCalledTimes(1);
    expect(mockChildren.mock.lastCall[0]["actionList"].length).toBeLessThan(4);
  });

  it("no permissions", async () => {
    const customJokesPermission = {
      joke: {
        canAddRating: () => false,
        canManage: () => false,
        canUpdateVisibility: () => false,
      },
    };

    const wrapper = mount(
      <DetailView
        jokesDataObject={jokesDataObject}
        jokeDataObject={jokeDataObject}
        jokesPermission={customJokesPermission}
        awscDataObject={awscDataObject}
        preferenceDataObject={preferenceDataObject}
      />
    );

    expect(wrapper.find({ icon: "mdi-eye" })).toHaveLength(0);
  });
});
