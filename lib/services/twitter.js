const Twit = require('twit');

const defaultCredentials = {
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token: 'access_token',
  access_token_secret: 'access_token_secret'
};

class Twitter {

  constructor(credentials=defaultCredentials) {
    this.client = new Twit(credentials);
  }

}

module.exports = Twitter;
