const Service = require('./service');
const Twitter = require('./twitter');

describe('Loading a service', () => {

  test('returns a service when implemented', () => {
    let twitter = Service.load('twitter');
    expect(twitter).toBeInstanceOf(Twitter);
  });

});
