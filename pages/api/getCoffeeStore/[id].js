import database from "../../../config/database";
import { findCoffeeStoreRecord } from "../../../utils/coffeeStores";

const getCoffeeStoreById = async (req, res) => {
  try {
    if (req.method === "GET") {
      const id = req.query.id || req.params.id;

      if (!id) {
        res.status(400).send(`Id ${id} does not exist`);
        return;
      }

      const table = database("coffee-stores");
      const coffeeStoreRecord = await findCoffeeStoreRecord(table, id);

      if (!coffeeStoreRecord.fields) {
        res.status(400).send(`Coffee store with id ${id} does not exist`);
        return;
      }

      const data = coffeeStoreRecord.fields;

      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getCoffeeStoreById;
