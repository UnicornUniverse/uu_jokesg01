import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

let Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  Category: {
    list(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("category/list", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("category/create", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("category/update", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    delete(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("category/delete", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Jokes: {
    load(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/load", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    setState(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("jokes/setState", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("jokes/update", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    init(dtoIn, baseUri) {
      let commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Joke: {
    list(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/list", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    load(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/load", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/create", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/update", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    delete(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/delete", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    addRating(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/addRating", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    updateVisibility(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("joke/updateVisibility", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },

    getImage(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("uu-app-binarystore/getBinaryData", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  Preference: {
    loadFirst(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("preference/loadFirst", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },

    createOrUpdate(dtoIn, baseUri) {
      const commandUri = Calls.getCommandUri("preference/createOrUpdate", baseUri);
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  getCommandUri(aUseCase, baseUri) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let properBaseUri = Environment.appBaseUri;
    if (baseUri) properBaseUri = !baseUri.endsWith("/") ? baseUri.concat("/") : baseUri;

    let targetUriStr = properBaseUri + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let url = Plus4U5.Common.Url.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) {
            let match = env.gatewayUri.match(/^([^:]*):\/\/([^/]+?)(?::(\d+))?(\/|$)/);
            if (match) {
              url.protocol = match[1];
              url.hostName = match[2];
              url.port = match[3];
            }
          }
          if (env.tid) url.tid = env.tid;
          if (env.awid) url.awid = env.awid;
        }
        if (env.vendor || env.app) {
          if (env.vendor) url.vendor = env.vendor;
          if (env.app) url.app = env.app;
          if (env.subApp) url.subApp = env.subApp;
        }
        targetUriStr = url.toString();
      }
    }

    return targetUriStr;
  },
};

export default Calls;
