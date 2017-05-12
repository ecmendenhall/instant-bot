const express = require('express');
const app = express();

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

module.exports = app;
