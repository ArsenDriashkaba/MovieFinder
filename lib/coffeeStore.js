import { isEmptyObj } from "../utils";
import { createImageUrl, getCoffeeStoresData, sizeMap } from "./coffeeStores";
import axios from "axios";

const getReqUrlForImages = (id) => {
  return `${process.env.NEXT_PUBLIC_FOURSQUARE_API_URL}${id}/photos`;
};

export const generateStaticPaths = (data) => {
  return data.map((path) => {
    return {
      params: {
        id: path.fsq_id.toString(),
      },
    };
  });
};

export const getStoreLocality = (data) => {
  if (!data || isEmptyObj(data)) {
    return "";
  }

  return data.find((store) => store.location.locality).location.locality;
};

export const generateStoreInfo = (data) => {
  if (!data || isEmptyObj(data)) {
    return {};
  }

  return {
    address: data.location.formatted_address,
    neighbourhood: data.location.region,
  };
};

export const getCoffeeStoreById = async (id) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/getCoffeeStore/${id}`;

    return await axios.get(url);
  } catch (err) {
    return err;
  }
};

export const pushCoffeeStore = async (coffeeStoreData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/createCoffeeStore`;

    return await axios.post(url, coffeeStoreData);
  } catch (err) {
    return err;
  }
};

export const updateCoffeeStore = async (id, newCoffeeStoreData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/updateCoffeeStore/${id}`;

    return await axios.put(url, newCoffeeStoreData);
  } catch (err) {
    return err;
  }
};

export const getCoffeeStoreImages = async (id) => {
  try {
    const url = getReqUrlForImages(id);

    const dataConfig = {
      headers: {
        Accept: "application/json",
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
      },
    };

    const response = await axios.get(url, dataConfig);
    const resImages = response?.data;

    return resImages.map((img) => createImageUrl(img, sizeMap.original));
  } catch (error) {
    return error;
  }
};
