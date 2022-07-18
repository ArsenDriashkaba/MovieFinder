import { object, string, number } from "yup";

const updateCoffeeStoreSchema = object({
  name: string().min(3).max(30),
  address: string(),
  neighbourhood: string(),
  rating: number().integer().min(0),
  imgUrl: string(),
});

export default updateCoffeeStoreSchema;
