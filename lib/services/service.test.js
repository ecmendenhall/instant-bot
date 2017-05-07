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

});
