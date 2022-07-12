import database from "../../../config/database";
import {
  findCoffeeStoreRecord,
  updateRecord,
} from "../../../utils/coffeeStores";

const updateCoffeeStoreById = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const id = req.query.id;
      const table = database("coffee-stores");
      const coffeeStoreRecord = await findCoffeeStoreRecord(table, id);
      console.log(coffeeStoreRecord);

      if (coffeeStoreRecord) {
        const fields = req.body;
        const updatedRecord = await updateRecord(
          table,
          coffeeStoreRecord,
          fields
        );

        res.status(200).send(updatedRecord);

        return;
      }

      res.status(400).send(`Coffee store with id ${id} does not exist`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default updateCoffeeStoreById;
