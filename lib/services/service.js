const Twitter = require('./twitter');
const Mastodon = require('./mastodon');

const services = {
  'twitter': {
    class: Twitter,
    credentials: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  },
  'mastodon': {
    class: Mastodon,
    credentials: {
      access_token: process.env.MASTODON_ACCESS_TOKEN,
      api_url: process.env.MASTODON_API_URL
    }
  }
}

class Service {
  static load(name, config) {
    return new services[name].class(config)
  }

  static credentials(name) {
    return services[name].credentials;
  }
}

module.exports = Service;
