import axios from "axios";
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getListOfUnsplashImages = async (query, limit) => {
  const imagesReq = await unsplashApi.search.getPhotos({
    query: query,
    perPage: limit,
  });

  return imagesReq?.response?.results;
};

const getCoffeeStoresData = async (url) => {
  const dataConfig = {
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  const response = await axios.get(url, dataConfig);

  return response.data.results;
};

export const getSearchPlacesUrl = (
  query,
  latitude,
  longitude,
  limit,
  radius = 1500
) => {
  return `${process.env.NEXT_PUBLIC_FOURSQUARE_API_URL}?query=${query}&ll=${latitude}%2C${longitude}&radius=${radius}&limit=${limit}`;
};

export const fetchCoffeeStores = async (url) => {
  const coffeeShopsData = await getCoffeeStoresData(url);
  const coffeeImages = await getListOfUnsplashImages(
    "coffee shops",
    coffeeShopsData.length
  );

  return coffeeShopsData.map((data, index) => {
    const coffeeStoreImgUrl = coffeeImages[index]?.urls?.regular;

    return { ...data, imgUrl: coffeeStoreImgUrl };
  });
};
