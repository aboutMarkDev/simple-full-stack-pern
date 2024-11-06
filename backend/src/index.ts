import express, { Application, urlencoded } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", (req, res) => {
  res.send("Hello server");
});

app.use("/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
