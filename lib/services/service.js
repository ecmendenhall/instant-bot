const Twitter = require('./twitter');
const Mastodon = require('./mastodon');

class Service {
  static load(name, config) {
    switch(name) {
    case 'twitter':
      return new Twitter(config);
      break;
    case 'mastodon':
      return new Mastodon(config);
      break;
    default:
      break;
    }
  }
}

module.exports = Service;
