const Bot = require('./bot');
const Twitter = require('./services/twitter');

describe('Bot', () => {

  test('stores configuration', () => {
    let newBot = new Bot({service: "twitter"});
    expect(newBot.config.service).toBe("twitter");
    expect(newBot.config.rate).toBe(1);
  });

  test('loads a service', () => {
    let newBot = new Bot({service: "twitter"});
    expect(newBot.service).toBeInstanceOf(Twitter);
  });

  test('loads new messages on run', () => {
    let newBot = new Bot({service: "twitter"});
    newBot.service.loadNew = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          messages: [{text: 'message'}],
          mentions: [{text: 'mention'}, {text: 'mention'}]
        });
      })
    });
    return newBot.run().then((bot) => {
      expect(bot.messages.length).toBe(1);
      expect(bot.mentions.length).toBe(2);
    });
  });
});
