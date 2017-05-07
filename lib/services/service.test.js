const Service = require('./service');
const Twitter = require('./twitter');
const Mastodon = require('./mastodon');

describe('Loading a service', () => {

  test('returns a Twitter service', () => {
    let service = Service.load('twitter', {});
    expect(service).toBeInstanceOf(Twitter);
  });

  test('returns a Mastodon service', () => {
    let service = Service.load('mastodon', {});
    expect(service).toBeInstanceOf(Mastodon);
  });

  test('passes config to the service', () => {
    let config = {key: 'value'};
    let service = Service.load('twitter', config);
    expect(service.config).toBe(config);
  });

  test('loads custom config vars for twitter', () => {
    let credentials = Service.credentials('twitter');
    expect(credentials.consumer_key).toBe(process.env.TWITTER_CONSUMER_KEY);
    expect(credentials.consumer_secret).toBe(process.env.TWITTER_CONSUMER_SECRET);
    expect(credentials.access_token).toBe(process.env.TWITTER_ACCESS_TOKEN);
    expect(credentials.access_token_secret).toBe(process.env.TWITTER_ACCESS_TOKEN_SECRET);
  });

  test('loads custom config vars for mastodon', () => {
    let credentials = Service.credentials('mastodon');
    expect(credentials.access_token).toBe(process.env.MASTODON_ACCESS_TOKEN);
  })

});
