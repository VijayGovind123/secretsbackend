const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://kishore:1234@cluster0.w7w19gv.mongodb.net/QoutesDb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Quote = mongoose.model("Quote", {
  content: String,
  date: Date,
});

app.post("/api/quotes", async (req, res) => {
  try {
    const { content } = req.body;
    const date = new Date();

    const newQuote = new Quote({ content, date });
    await newQuote.save();

    res.json({ message: "Quote submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.get("/", (req, res) => {
  res.send("Helo");
});
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ date: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
