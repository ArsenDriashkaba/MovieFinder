export const isEmptyObj = (object) => {
  return Object.keys(object).length == 0;
};

export const findStoreById = (stores, id) =>
  stores.find((store) => store.fsq_id.toString() === id);

export const getFieldsFromRecordsData = (records) => {
  return records.map((record) => record.fields);
};

export const getDateString = (value) => {
  const date = new Date(value);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
};
