const Service = require('./service');
const Twitter = require('./twitter');

describe('Loading a service', () => {

  test('returns a service when implemented', () => {
    let twitter = Service.load('twitter', {});
    expect(twitter).toBeInstanceOf(Twitter);
  });

  test('passes config to the service', () => {
    let config = {key: 'value'};
    let twitter = Service.load('twitter', config);
    expect(twitter.config).toBe(config);
  });

});
