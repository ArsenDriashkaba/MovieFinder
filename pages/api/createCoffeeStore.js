import database from "../../config/database";
import { findCoffeeStoreRecord, createRecord } from "../../utils/coffeeStores";
import coffeeStoreSchema from "../../utils/schemas/coffeeStore";

const createCoffeeStore = async (req, res) => {
  try {
    if (req.method === "POST") {
      const table = database("coffee-stores");
      const coffeeStoreRecord = await findCoffeeStoreRecord(table, req.body.id);

      if (coffeeStoreRecord) {
        res.status(400).send(`Coffee store with id ${id} is already exist`);

        return;
      }

      const fields = req.body;

      await coffeeStoreSchema.validate(fields);

      const newRecord = await createRecord(table, fields);

      res.status(200).send(newRecord);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default createCoffeeStore;
