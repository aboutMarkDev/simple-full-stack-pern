import express, { Application, urlencoded } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import errorMiddleware from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/users", userRoutes);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
