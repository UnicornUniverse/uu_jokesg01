//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { ContentContainer, DataStateResolver } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
import useWorkspace from "../../../workspace/use-workspace.js";
import useCategory from "../../use-category.js";
import Content from "./content.js";
//@@viewOff:imports

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  nestingLevel: ContentContainer.getComponentNestingLevel(Content.nestingLevel),
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...ContentContainer.getComponentPropTypes(Content.nestingLevel),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...ContentContainer.getComponentDefaultProps(Content.nestingLevel),
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { workspaceDto } = useWorkspace();
    const { categoryDto } = useCategory();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <DataStateResolver dataObject={[workspaceDto, categoryDto]} nestingLevel="spot">
        <Content {...props} category={categoryDto.data} />
      </DataStateResolver>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
