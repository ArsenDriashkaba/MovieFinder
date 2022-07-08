export const isEmptyObj = (object) => {
  return Object.keys(object).length == 0;
};

export const findStoreById = (stores, id) =>
  stores.find((store) => store.fsq_id.toString() === id);
