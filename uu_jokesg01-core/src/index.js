import Uu5 from "uu5g05";
import * as Joke from "./joke/joke.js";
import * as Jokes from "./jokes/jokes.js";
import * as Core from "./core/core";
import * as Utils from "./utils/utils";
import * as Category from "./category/category.js";
import * as Preference from "./preference/preference.js";

export { Joke, Jokes, Category, Core, Utils, Preference };
export default { Joke, Jokes, Core, Utils, Category, Preference };

if (process.env.NODE_ENV !== "test") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}

Uu5.Utils.LibraryRegistry.registerLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});
