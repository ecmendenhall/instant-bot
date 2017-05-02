const Twitter = require('./twitter');

class Service {
  static load(name) {
    switch(name) {
    case 'twitter':
      return new Twitter();
      break;
    default:
      break;
    }
  }
}

module.exports = Service;
