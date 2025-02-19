import * as dotenv from "dotenv";
import * as express from "express";
import sequelize from "./config/database";
import { BookController } from "./controllers/bookController";
import { BookCopyController } from "./controllers/bookCopyController";
import { UserController } from "./controllers/userController";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/books", BookController.createBook);
app.get("/api/books", BookController.getAllBooks);
app.get("/api/books/:id", BookController.getBook);
app.put("/api/books/:id", BookController.updateBook);
app.delete("/api/books/:id", BookController.deleteBook);

app.post("/api/users", UserController.createUser);
app.get("/api/users", UserController.getAllUsers);
app.get("/api/users/:id", UserController.getUser);
app.get("/api/users/email/:email", UserController.getUserByEmail);
app.put("/api/users/:id", UserController.updateUser);
app.delete("/api/users/:id", UserController.deleteUser);

app.post("/api/bookCopies", BookCopyController.createBookCopy);
app.get("/api/bookCopies", BookCopyController.getAllBookCopies);
app.get("/api/bookCopies/:id", BookCopyController.getBookCopy);
app.put("/api/bookCopies/:id", BookCopyController.updateBookCopy);
app.delete("/api/bookCopies/:id", BookCopyController.deleteBookCopy);
app.get("/api/bookCopies/book/:bookId", BookCopyController.getBookCopiesByBookId);

app.get("/healthz", (_, res) => {
  res.status(200).send('OK');
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected!");
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
