const marked = require('marked');
const fs = require('fs');

function renderString(markdown) {
  return marked(markdown);
}

function renderFile(fileName, callback) {
  fs.readFile(fileName, (err, data) => {
    callback(renderString(data.toString('utf8')));
  });
}

module.exports = {
  renderString: renderString,
  renderFile: renderFile
}
