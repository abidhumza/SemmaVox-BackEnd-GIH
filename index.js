const express = require("express");
const bodyParser = require("body-parser");
const SummarizerManager = require("node-summarizer").SummarizerManager;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Route to handle summarization
app.post("/summarize", async (req, res) => {
  try {
    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ error: "No content provided" });
    }

    // Create a new SummarizerManager instance
    const Summarizer = new SummarizerManager(content, 5); // 5 sentences as summary

    // Perform the summarization
    const summary = await Summarizer.getSummaryByRank();

    res.json({ summary: summary.summary });
  } catch (error) {
    console.error("Error during summarization:", error);
    res.status(500).json({ error: "An error occurred during summarization" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
