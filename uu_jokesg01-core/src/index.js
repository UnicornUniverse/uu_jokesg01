import UU5 from "uu5g04";
import * as Joke from "./joke/joke.js";
import * as Jokes from "./jokes/jokes.js";
import * as Core from "./core/core";
import * as Utils from "./utils/utils";

export { Joke, Jokes, Core, Utils };
export default { Joke, Jokes, Core, Utils };

if (process.env.NODE_ENV !== "test") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}
UU5.Environment.addRuntimeLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});

// TODO LACO V uuapp.json jsou nesprávně přidány 2 componenty EditModal*
// TODO LACO The dependency uu_territoryg01 MUST be added to all demo files to work properly
// TODO LACO Fix typing error in new demo file for BasicInfo component
