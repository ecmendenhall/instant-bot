const Bot = require('./lib/bot');

const instantBot = (config) => {
  return new Bot(config).run();
}

module.exports = instantBot
