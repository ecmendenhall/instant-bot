const AWS = require('./aws');
const Glitch = require('./glitch');
const Host = require('./host');

describe('Loading a host', () => {

  test('returns a Glitch host', () => {
    let service = Host.load('glitch');
    expect(service).toBeInstanceOf(Glitch);
  });

  test('returns an AWS host', () => {
    let service = Host.load('aws');
    expect(service).toBeInstanceOf(AWS);
  });

});
