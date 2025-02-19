import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/database";
import bookCopyRoutes from "./routes/bookCopyRoutes";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import loanRoutes from "./routes/loanRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/bookCopies", bookCopyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);

app.get("/healthz", (_, res) => {
  res.status(200).send('OK');
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected!");
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
