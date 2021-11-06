import app from "./app";
import config from "../config.json";
import * as dotenv from "dotenv";
import { mongoDatabase } from "./app/config/mongo-database";

dotenv.config();

mongoDatabase();
// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);

app.listen(port, () => {
  console.info("Express application started on port: " + port);
});
