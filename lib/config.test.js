const Config = require('./config');

describe('parsing configuration', () => {

  beforeEach(() => {
    this.now = Date.now;
    Date.now = jest.fn(() => 1493699825503)
  });

  afterEach(() => {
    Date.now = this.now;
  });

  test('returns a default configuration', () => {
    let config = Config.parse()
    expect(config.service).toBe("twitter");
    expect(config.rate).toBe(1);
  });

  test('accepts a service option', () => {
    let config = Config.parse({service: 'mastodon'})
    expect(config.service).toBe('mastodon');
  });

  test('accepts a rate option', () => {
    let config = Config.parse({rate: '5 minutes'})
    expect(config.rate).toBe(5);
  });

  test('merges custom config with defaults', () => {
    let customRate = Config.parse({rate: '5 minutes'})
    expect(customRate.rate).toBe(5);
    expect(customRate.service).toBe('twitter');

    let customService = Config.parse({service: 'mastodon'})
    expect(customService.rate).toBe(1);
    expect(customService.service).toBe('mastodon');
  });

  test('stores last run time as date', () => {
    let config = Config.parse({rate: '3 minutes'})
    expect(config.lastRun.utc().format()).toBe("2017-05-02T04:36:05Z");
  });

});
