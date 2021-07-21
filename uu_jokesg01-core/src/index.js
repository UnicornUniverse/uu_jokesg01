import UU5 from "uu5g04";
import * as Joke from "./joke/joke.js";
import * as Jokes from "./jokes/jokes.js";
import * as Core from "./core/core";
import * as Utils from "./utils/utils";

export { Joke, Jokes, Core, Utils };
import * as Category from "./category/category.js";
export { Category };
export default { Joke, Jokes, Core, Utils, Category };

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
