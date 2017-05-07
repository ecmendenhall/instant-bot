const juration = require('juration');
const moment = require('moment');
require('dotenv').config();

const defaultConfig = {
  service: "twitter",
  rate: "1 minute",
  credentials: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  }
};

class Config {
  static parse(opts) {
    let config = Object.assign({}, defaultConfig, opts);
    config.rate = juration.parse(config.rate) / 60;
    config.lastRun = moment().subtract(1, "minutes");
    return config;
  }
}

module.exports = Config
