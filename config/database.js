import Airtable from "airtable";

const database = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "app65R6d5Xvq0jI7m"
);

export default database;
