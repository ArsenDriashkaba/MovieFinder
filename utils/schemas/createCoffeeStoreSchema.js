import { object, string, number } from "yup";

const createCoffeeStoreSchema = object({
  id: string().required().min(1),
  name: string().required().min(3).max(30),
  address: string(),
  neighbourhood: string(),
  rating: number().required().integer().min(0),
  imgUrl: string(),
});

export default createCoffeeStoreSchema;
