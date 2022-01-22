import Uu5 from "uu5g05";
import * as Joke from "./joke/joke.js";
import * as Jokes from "./jokes/jokes.js";
export { Joke, Jokes };
export default { Joke, Jokes };

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
