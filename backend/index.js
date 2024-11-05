import express from "express";

const app = express();
const PORT = 5000;

app.use("/", (req, res) => res.send("Hello Server"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
