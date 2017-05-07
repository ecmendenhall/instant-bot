const Twitter = require('./twitter');

class Service {
  static load(name, config) {
    switch(name) {
    case 'twitter':
      return new Twitter(config);
      break;
    default:
      break;
    }
  }
}

module.exports = Service;
