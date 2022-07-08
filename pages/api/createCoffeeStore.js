import database from "../../config/database";

const findCoffeeStoreRecord = async (table, id) => {
  return await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();
};

const getFieldsFromRecordsData = (records) => {
  return records.map((record) => record.fields);
};

const createCoffeeStoreRecord = async (table, data) => {
  return await table.create([
    {
      fields: data,
    },
  ]);
};

const createCoffeeStore = async (req, res) => {
  try {
    if (req.method === "POST") {
      const table = database("coffee-stores");
      const coffeeStoreRecord = await findCoffeeStoreRecord(table, req.body.id);

      if (coffeeStoreRecord.length > 0) {
        const data = getFieldsFromRecordsData(coffeeStoreRecord);

        res.status(200).send(data);

        return;
      }

      const newRecord = await createCoffeeStoreRecord(table, req.body);

      res.status(200).send(newRecord);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default createCoffeeStore;
