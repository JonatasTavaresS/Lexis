import * as dotenv from "dotenv";
import * as express from "express";
import sequelize from "./config/database";
import { BookController } from "./controllers/bookController";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/books", BookController.createBook);
app.get("/api/books", BookController.getAllBooks);
app.get("/api/books/:id", BookController.getBook);
app.put("/api/books/:id", BookController.updateBook);
app.delete("/api/books/:id", BookController.deleteBook);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected!");
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
