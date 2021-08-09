import UU5 from "uu5g04";
import * as Joke from "./joke/joke.js";
export { Joke };
import * as Jokes from "./jokes/jokes.js";
export { Jokes };
export default { Joke, Jokes };

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

// TODO LACO Nefunguje demo pro BasiInfo
