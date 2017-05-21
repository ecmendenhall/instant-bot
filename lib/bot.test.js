const Bot = require('./bot');
const Twitter = require('./services/twitter');
const AWS = require('./hosts/aws');

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

  test('loads a host', () => {
    let newBot = new Bot({host: "aws"});
    expect(newBot.host).toBeInstanceOf(AWS);
  });

  test('stores a shortcut to its client', () => {
    let newBot = new Bot({service: "twitter"});
    expect(newBot.client).toBe(newBot.service.client);
  });

  test('loads new messages on run', (done) => {
    let newBot = new Bot({service: "twitter"});
    newBot.service.getNew = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          messages: [{text: 'message'}],
          mentions: [{text: 'mention'}, {text: 'mention'}],
          recentPosts: [{text: 'post'}]
        });
      })
    });
    return newBot.run((bot) => {
      expect(bot.messages.length).toBe(1);
      expect(bot.mentions.length).toBe(2);
      expect(bot.recentPosts.length).toBe(1);
      done();
    });
  });

  test('delegates post to its service', () => {
    let newBot = new Bot({service: "twitter"});
    newBot.service.post = jest.fn();
    newBot.post('some message');
    expect(newBot.service.post.mock.calls[0][0]).toBe('some message');
  });

  test('delegates postImage to its service', () => {
    let newBot = new Bot({service: "mastodon"});
    newBot.service.postImage = jest.fn();
    newBot.postImage('some message', 'abc123');
    expect(newBot.service.postImage.mock.calls[0][0]).toBe('some message');
    expect(newBot.service.postImage.mock.calls[0][1]).toBe('abc123');
  });
});
