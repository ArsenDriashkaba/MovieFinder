import { getFieldsFromRecordsData } from ".";

export const findCoffeeStoreRecord = async (table, id) => {
  const arrOfRecords = await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();

  return arrOfRecords[0];
};

export const updateRecord = async (table, record, recFields) => {
  const recordData = await table.update([
    {
      id: record.id,
      fields: recFields,
    },
  ]);

  return getFieldsFromRecordsData(recordData);
};

export const createRecord = async (table, recFields) => {
  const recordData = await table.create([
    {
      fields: recFields,
    },
  ]);

  return getFieldsFromRecordsData(recordData);
};
