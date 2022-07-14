import { isEmptyObj } from "../utils";
import axios from "axios";

export const generateStaticPaths = (data) => {
  return data.map((path) => {
    return {
      params: {
        id: path.fsq_id.toString(),
      },
    };
  });
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
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/getCoffeeStore/${id}`;

  return await axios.get(url);
};

export const pushCoffeeStore = async (coffeeStoreData) => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/createCoffeeStore`;

  return await axios.post(url, coffeeStoreData);
};

export const updateCoffeeStore = async (id, newCoffeeStoreData) => {
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/updateCoffeeStore/${id}`;

  return await axios.put(url, newCoffeeStoreData);
};
