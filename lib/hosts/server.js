const markdown = require('./markdown');
const express = require('express');
const app = express();


app.get("/", (_req, res) => {
  markdown.renderFile('./README.md', (renderedFile) => {
    res.status(200).send(renderedFile);
  });
});

module.exports = app;
