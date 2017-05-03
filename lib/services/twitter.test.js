const Twitter = require('./twitter');
jest.mock('Twit');
const Twit = require('twit');

const credentials = {
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token: 'access_token',
  access_token_secret: 'access_token_secret'
};

describe('Twitter service', () => {

  test('exists', () => {
    expect(Twitter).not.toBe(null);
  });

  test('sets up a client', () => {
    let twitter = new Twitter(credentials);
    expect(twitter.client).toBeInstanceOf(Twit);
  });

});
