import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

const Calls = {
  call(method, url, dtoIn, clientOptions) {
    return Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },

  Binary: {
    createAccessKey(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("binary/createAccessKey", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    getData(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("binary/getData", baseUri);
      return Calls.call("get", commandUri, dtoIn);
    },
  },

  Category: {
    list(baseUri, dtoIn) {
      let commandUri = Calls.getCommandUri("category/list", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },
    update(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("category/update", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    create(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("category/create", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    delete(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("category/delete", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    get(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("category/get", baseUri);
      return Plus4U5.Utils.AppClient.groupGet(
        commandUri,
        dtoIn,
        async () => Calls.call("cmdGet", commandUri, dtoIn),
        async (dtoInList) => {
          const groupCallDtoIn = { idList: dtoInList.map((dtoIn) => dtoIn.id) };
          return Calls.Category.list(baseUri, groupCallDtoIn);
        },
      );
    },
  },

  Joke: {
    get(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/get", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },

    update(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/update", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },

    addRating(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/addRating", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },

    updateVisibility(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/updateVisibility", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },

    load(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/load", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },

    list(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/list", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },

    create(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/create", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },

    delete(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("joke/delete", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
  },

  Preference: {
    loadFirst(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("preference/loadFirst", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },

    createOrUpdate(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("preference/createOrUpdate", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
  },

  Workspace: {
    load(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/load", baseUri);
      return Calls.call("cmdGet", commandUri, dtoIn);
    },
    update(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("jokes/update", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    setState(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("jokes/setState", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
    init(baseUri, dtoIn) {
      const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init", baseUri);
      return Calls.call("cmdPost", commandUri, dtoIn);
    },
  },

  Territory: {
    Artifact: {
      find(baseUri, dtoIn) {
        const commandUri = Calls.getCommandUri("uuArtifactIfc/find", baseUri);
        return Calls.call("cmdGet", commandUri, dtoIn);
      },
    },
  },
};

export default Calls;
