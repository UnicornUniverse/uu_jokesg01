//@@viewOn:imports
import { useDataObject, useMemo, useEffect } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:helpers
function generateImageUrl(imageFile) {
  return URL.createObjectURL(imageFile);
}

async function addImage(joke, baseUri) {
  const {
    baseUri: binaryBaseUri,
    awid: clientAwid,
    accessKey,
    code,
  } = await Calls.Binary.createAccessKey(baseUri, { code: joke.image });

  const imageDtoIn = { clientAwid, accessKey, code };
  const imageDtoOut = await Calls.Binary.getData(binaryBaseUri, imageDtoIn);
  const imageFile = imageDtoOut.data;
  const imageUrl = generateImageUrl(imageFile);

  return { ...joke, imageFile, imageUrl };
}
//@@viewOff:helpers

function useProvider({ baseUri: propBaseUri, oid, skipInitialLoad = false, skipImageLoad = false }) {
  const subApp = useSubApp();
  const baseUri = propBaseUri ?? subApp.baseUri;
  const canLoad = baseUri && oid ? true : false;

  const jokeDto = useDataObject(
    {
      skipInitialLoad: canLoad ? skipInitialLoad : false,
      handlerMap: {
        load: canLoad ? handleLoad : undefined,
        update: handleUpdate,
        updateVisibility: handleUpdateVisibility,
        addRating: handleAddRating,
        delete: handleDelete,
      },
    },
    [baseUri, oid],
  );

  useEffect(() => {
    return () => URL.revokeObjectURL(jokeDto.data?.imageUrl);
  }, [jokeDto.data?.imageUrl]);

  async function handleLoad() {
    if (!oid) {
      return;
    }

    let joke = await Calls.Joke.get(baseUri, { id: oid });

    if (joke.image && !skipImageLoad) {
      joke = await addImage(joke, baseUri);
    }

    return joke;
  }

  async function handleUpdate(values) {
    const dtoIn = { ...values, id: jokeDto.data.id };

    let joke = await Calls.Joke.update(baseUri, dtoIn);
    joke.imageFile = values.image;
    joke.imageUrl = values.image ? generateImageUrl(values.image) : undefined;

    return joke;
  }

  async function handleUpdateVisibility({ visibility }) {
    const dtoIn = { id: jokeDto.data.id, visibility };
    const joke = await Calls.Joke.updateVisibility(baseUri, dtoIn);
    return mergeJoke(joke);
  }

  async function handleAddRating({ rating }) {
    const dtoIn = { id: jokeDto.data.id, rating };
    const joke = await Calls.Joke.addRating(baseUri, dtoIn);
    return mergeJoke(joke);
  }

  function handleDelete({ id }) {
    return Calls.Joke.delete(baseUri, { id });
  }

  function mergeJoke(joke) {
    return (prevData) => {
      return { ...joke, imageFile: prevData.imageFile, imageUrl: prevData.imageUrl };
    };
  }

  const value = useMemo(
    () => ({
      jokeDto,
      baseUri,
      oid,
    }),
    [jokeDto, baseUri, oid],
  );

  return value;
}

//@@viewOn:exports
export { useProvider };
export default useProvider;
//@@viewOff:exports
