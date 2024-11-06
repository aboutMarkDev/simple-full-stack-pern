import express, { Application, urlencoded } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import errorMiddleware from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/users", userRoutes);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
