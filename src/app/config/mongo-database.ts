import mongoose from "mongoose";
import config from "../../../config.json";

export function mongoDatabase() {
  mongoose
    .connect(process.env.MONGO_URI || config.MONGO_URI)
    .then(() => {
      console.log("Connect mongodb successfully");
    })
    .catch((error) => {
      console.log("Error connecting mongodb");
      console.error(error);
    });
}
