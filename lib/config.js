const juration = require('juration');

const defaultConfig = {
  service: "twitter",
  rate: "1 minute"
};

const Config = {
  parse: (opts) => {
    let config = Object.assign(defaultConfig, opts);
    config.rate = juration.parse(config.rate) / 60;
    return config;
  }
}

module.exports = Config
