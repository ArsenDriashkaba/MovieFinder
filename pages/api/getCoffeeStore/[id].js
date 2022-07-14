import database from "../../../config/database";
import { findCoffeeStoreRecord } from "../../../utils/coffeeStores";

const getCoffeeStoreById = async (req, res) => {
  try {
    if (req.method === "GET") {
      const id = req.query.id || req.params.id;
      const table = database("coffee-stores");
      const coffeeStoreRecord = await findCoffeeStoreRecord(table, id);

      if (coffeeStoreRecord) {
        const data = coffeeStoreRecord.fields;

        res.status(200).send(data);

        return;
      }

      res.status(400).send(`Coffee store with id ${id} does not exist`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default getCoffeeStoreById;
