const express = require("express");
const cors = require("cors");
const saveContractorData = require("./saveContractor.cjs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/save-contractor", (req, res) => {
  const { name, company, email } = req.body;
  if (!name || !company || !email) return res.status(400).send("Missing data");

  saveContractorData({ name, company, email });
  res.status(200).send("Saved");
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));