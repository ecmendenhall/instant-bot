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
          {text: 'Some toot text', created_at: '2017-05-06T23:01:00.000Z'},
          {text: 'Some toot text', created_at: '2017-05-06T23:02:00.000Z'},
        ]});
      });
    case 'statuses/mentions_timeline':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some mention text', created_at: '2017-05-06T23:00:00.000Z'},
          {text: 'Some mention text', created_at: '2017-05-06T23:01:00.000Z'},
          {text: 'Some mention text', created_at: '2017-05-06T23:02:00.000Z'}
        ]});
      });
    case 'accounts/verify_credentials':
      return new Promise((resolve, reject) => {
        resolve({data: {id: 123}});
      });
    case 'accounts/:id/statuses':
      return new Promise((resolve, reject) => {
        resolve({data: [
          {text: 'Some post text', created_at: moment().subtract(2, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSSZ')}
        ]});
      });
    default:
      break;
    }
  }
}

module.exports = MockMasto;
