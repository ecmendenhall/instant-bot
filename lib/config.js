const Service = require('./services/service');
const juration = require('juration');
const moment = require('moment');

const defaultConfig = {
  service: "twitter",
  rate: "1 minute"
};

class Config {
  static parse(opts) {
    let config = Object.assign({}, defaultConfig, opts);
    config.rate = juration.parse(config.rate) / 60;
    config.lastRun = moment().subtract(1, "minutes");
    config.credentials = Service.credentials(config.service);
    return config;
  }
}

module.exports = Config
