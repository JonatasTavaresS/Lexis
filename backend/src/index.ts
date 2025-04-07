import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import sequelize from "./config/database";
import setupSwagger from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import bookCopyRoutes from "./routes/bookCopyRoutes";
import bookRoutes from "./routes/bookRoutes";
import loanRoutes from "./routes/loanRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/books", bookRoutes);
app.use("/api/bookCopies", bookCopyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/auth", authRoutes);

app.get("/healthz", (_, res) => {
  res.status(200).send('OK');
});

setupSwagger(app);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected!");
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch((error) => {
  if (process.env.NODE_ENV === 'test') { return; }
  console.error("Error connecting to the database:", error);
});

export default app;
