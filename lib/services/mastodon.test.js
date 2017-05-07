const Mastodon = require('./mastodon');
jest.mock('mastodon');
const Masto = require('mastodon');
const moment = require('moment');

const config = {
  lastRun: moment('Sat May 06 23:01:00 +0000 2017', 'dd MMM DD HH:mm:ss ZZ YYYY', 'en'),
  credentials: {
    access_token: 'access_token',
    api_url: 'https://example.com/api/v1/'
}};

describe('Mastodon service', () => {

  test('exists', () => {
    expect(Mastodon).not.toBe(null);
  });

  test('sets up a client', () => {
    let mastodon = new Mastodon(config);
    expect(mastodon.client).toBeInstanceOf(Masto);
  });

  test('loads messages', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getNewMessages().then((res) => {
      expect(mastodon.client.getPath).toBe('timelines/home');
      expect(res[0].text).toBe('Some toot text');
    });
  });

  test('filters messages older than lastRun', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getNewMessages().then((res) => {
      expect(mastodon.client.getPath).toBe('timelines/home');
      expect(res.length).toBe(2);
    });
  });

  test('loads mentions', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getNewMentions().then((res) => {
      //expect(mastodon.client.getPath).toBe('statuses/mentions_timeline');
      //expect(res).toBe([]);
    });
  });

  test('filters mentions older than lastRun', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getNewMentions().then((res) => {
      //expect(mastodon.client.getPath).toBe('statuses/mentions_timeline');
      expect(res.length).toBe(0);
    });
  });

  test('loads new messages, mentions, and recent posts', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getNew().then(() => {
      expect(mastodon.messages.length).toBe(2);
      expect(mastodon.mentions.length).toBe(0);
      expect(mastodon.recentPosts.length).toBe(1);
    });
  });

  test('posts', () => {
    let mastodon = new Mastodon(config);
    return mastodon.post('Some post text').then((res) => {
      expect(mastodon.client.postPath).toBe('statuses');
      expect(res.id).toBe(1);
    });
  });

  test('loads recent posts', () => {
    let mastodon = new Mastodon(config);
    return mastodon.getRecentPosts().then((res) => {
      expect(mastodon.client.getPath).toBe('accounts/:id/statuses');
      expect(mastodon.client.getOptions.user_id).toBe(123);
      expect(mastodon.user.id).toBe(123);
      expect(res.length).toBe(1);
    });
  });

  test('does not post if the latest post was created within the rate window', () => {
    let slowConfig = Object.assign({}, config, {rate: 10});
    let mastodon = new Mastodon(slowConfig);
    return mastodon.post('some message').then((res) => {
      expect(res.id).toBe(null);
    });
  });

});
