import { createVisualComponent, PropTypes } from "uu5g05";

function withEditMode(Component, EditModal, { statics } = {}) {
  return createVisualComponent({
    //@@viewOn:statics
    ...statics,
    uu5Tag: `withEditMode(${Component.uu5Tag})`,

    editMode: {
      displayType: "block",
      customEdit: true,
      lazy: true,
    },
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes, editMode: PropTypes.object },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: { ...Component.defaultProps },
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const { editMode, ...componentProps } = props;

      return (
        <>
          <Component {...componentProps} />
          {editMode?.edit && (
            <EditModal
              componentType={Component}
              componentProps={componentProps}
              onSave={editMode.onEditEnd}
              onClose={editMode.onEditEnd}
              onReady={editMode.onReady}
            />
          )}
        </>
      );
    },
    //@@viewOff:render
  });
}

//@@viewOn:exports
export { withEditMode };
export default withEditMode;
//@@viewOff:exports
