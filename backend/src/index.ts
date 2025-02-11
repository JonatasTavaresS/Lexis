import * as dotenv from "dotenv";
import * as express from "express";
import sequelize from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database connected!");
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
