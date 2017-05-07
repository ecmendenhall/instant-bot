const juration = require('juration');
const moment = require('moment');

const defaultConfig = {
  service: "twitter",
  rate: "1 minute",
  credentials: {}
};

class Config {
  static parse(opts) {
    let config = Object.assign({}, defaultConfig, opts);
    config.rate = juration.parse(config.rate) / 60;
    config.lastRun = moment().subtract(config.rate, "minutes");
    return config;
  }
}

module.exports = Config
