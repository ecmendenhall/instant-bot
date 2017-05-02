const moment = require('moment');

const Config = require('./config')

function bot(opts) {
  this.config = Config.parse(opts);
  return {
    config: this.config,
    lastRun: moment().subtract(this.config.rate, "minutes")
  }
}


module.exports = bot;
