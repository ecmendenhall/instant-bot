require('dotenv').config();
const Bot = require('./lib/bot');

const instantBot = (config, onRun) => {
  return new Bot(config).run(onRun);
}

module.exports = instantBot
