const express = require("express");
const path = require("path");
const app = express();
const port = 3001;

// Serve static files from the 'out' directory
app.use(express.static(path.join(__dirname, "out")));

// For any other routes, serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "out", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
