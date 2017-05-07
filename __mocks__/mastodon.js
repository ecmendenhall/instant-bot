const moment = require('moment');

class MockMasto {

  constructor(credentials) {
    this.credentials = credentials;
  }

  post(path, options) {
    this.postPath = path;
    this.postOptions = options;
    switch(path) {
    case 'statuses':
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
    case 'timelines/home':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some toot text', created_at: 'Sat May 06 23:00:00 +0000 2017'},
          {text: 'Some toot text', created_at: 'Sat May 06 23:01:00 +0000 2017'},
          {text: 'Some toot text', created_at: 'Sat May 06 23:02:00 +0000 2017'}
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
    case 'accounts/verify_credentials':
      return new Promise((resolve, reject) => {
        resolve({data: {id: 123}});
      });
    case 'accounts/:id/statuses':
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

module.exports = MockMasto;
