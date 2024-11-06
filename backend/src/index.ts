import express, { Application } from "express";

const app: Application = express();
const PORT = 5000;

app.use("/api", (req, res) => {
  res.send("Hello server");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
