const moment = require('moment');

class MockTwit {

  constructor(credentials) {
    this.credentials = credentials;
  }

  post(path, options) {
    this.postPath = path;
    this.postOptions = options;
    switch(path) {
    case 'statuses/update':
      return new Promise((resolve, reject) => {
        resolve({id: 1});
      });
    default:
      break;
    }
  }

  get(path, options) {
    this.getPath = path;
    this.getOptions = options;
    switch(path) {
    case 'statuses/home_timeline':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some tweet text', created_at: 'Sat May 06 23:00:00 +0000 2017'},
          {text: 'Some tweet text', created_at: 'Sat May 06 23:01:00 +0000 2017'},
          {text: 'Some tweet text', created_at: 'Sat May 06 23:02:00 +0000 2017'}
        ]});
      });
    case 'statuses/mentions_timeline':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some mention text', created_at: 'Sat May 06 23:00:00 +0000 2017'},
          {text: 'Some mention text', created_at: 'Sat May 06 23:01:00 +0000 2017'},
          {text: 'Some mention text', created_at: 'Sat May 06 23:02:00 +0000 2017'}
        ]});
      });
    case 'account/verify_credentials':
      return new Promise((resolve, reject) => {
        resolve({data: {id: 123}});
      });
    case 'statuses/user_timeline':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some post text', created_at: moment().subtract(2, 'minutes').format('dd MMM DD HH:mm:ss ZZ YYYY', 'en')}
        ]});
      });
    default:
      break;
    }
  }
}

module.exports = MockTwit;
