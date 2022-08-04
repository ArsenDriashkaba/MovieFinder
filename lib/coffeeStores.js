import axios from "axios";

export const sizeMap = {
  small: "400x300",
  medium: "800x600",
  original: "original",
};

export const getCoffeeStoresData = async (url) => {
  const dataConfig = {
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  const response = await axios.get(url, dataConfig);

  return response.data.results;
};

export const getFieldsParamString = (fields) => {
  return fields?.join("%2C");
};

export const createImageUrl = (photoData, size) => {
  return `${photoData?.prefix}${size}${photoData?.suffix}`;
};

const getCoffeeStoreImgUrl = (coffeeStoreData, size) => {
  if (!coffeeStoreData.photos || coffeeStoreData?.photos.length == 0) {
    return;
  }

  const photoData = coffeeStoreData.photos[0];

  return createImageUrl(photoData, size);
};

export const getSearchPlacesUrl = (
  query,
  latitude,
  longitude,
  limit,
  fields,
  radius = 1500
) => {
  const fieldsParamString = getFieldsParamString(fields);

  return `${process.env.NEXT_PUBLIC_FOURSQUARE_API_URL}search?query=${query}&ll=${latitude}%2C${longitude}&radius=${radius}&fields=${fieldsParamString}&limit=${limit}`;
};

export const fetchCoffeeStores = async (url) => {
  const coffeeShopsData = await getCoffeeStoresData(url);

  return coffeeShopsData.map((data) => {
    const coffeeStoreImgUrl = getCoffeeStoreImgUrl(data, sizeMap.original);

    return { ...data, imgUrl: coffeeStoreImgUrl };
  });
};
