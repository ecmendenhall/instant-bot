const moment = require('moment');
const juration = require('juration');

const defaultConfig = {
  service: "twitter",
  rate: "1 minute"
};

function processConfig(opts) {
  let config = Object.assign(defaultConfig, opts);
  config.rate = juration.parse(config.rate) / 60;
  return config;
}

function bot(opts) {
  this.config = processConfig(opts);
  return {
    config: this.config,
    lastRun: moment().subtract(this.config.rate, "minutes")
  }
}

module.exports = bot;
