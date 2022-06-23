//@@viewOn:imports
import { Joke } from "uu_jokesg01-core";
import { withEditMode, withErrorBoundary, withMargin } from "../core/core";
import EditModal from "./detail/edit-modal";
//@@viewOff:imports

let Detail = Joke.Detail;
Detail = withMargin(Detail);
Detail = withEditMode(Detail, EditModal);
Detail = withErrorBoundary(Detail);

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
