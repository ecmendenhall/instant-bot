const bot = require('./bot');

describe('Configuring a new bot', () => {

  beforeEach(() => {
    this.now = Date.now;
    Date.now = jest.fn(() => 1493699825503)
  });

  afterEach(() => {
    Date.now = this.now;
  });

  test('stores configuration', () => {
    let newBot = bot({service: "twitter"});
    expect(newBot.config.service).toBe("twitter");
    expect(newBot.config.rate).toBe(1);
  });

  test('stores rate in minutes', () => {
    let newBot = bot({rate: "3 minutes"});
    expect(newBot.config.rate).toBe(3);
  });

  test('stores last run time as date', () => {
    let newBot = bot({rate: "3 minutes"});
    expect(newBot.lastRun.utc().format()).toBe("2017-05-02T04:34:05Z");
  });
});
