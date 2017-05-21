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

  beforeEach(() => {
    this.mastodon = new Mastodon(config);
  });

  test('exists', () => {
    expect(Mastodon).not.toBe(null);
  });

  test('sets up a client', () => {
    expect(this.mastodon.client).toBeInstanceOf(Masto);
  });

  test('loads messages', () => {
    return this.mastodon.getNewMessages().then((res) => {
      expect(this.mastodon.client.getPath).toBe('timelines/home');
      expect(res[0].text).toBe('Some toot text');
    });
  });

  test('filters messages older than lastRun', () => {
    return this.mastodon.getNewMessages().then((res) => {
      expect(this.mastodon.client.getPath).toBe('timelines/home');
      expect(res.length).toBe(2);
    });
  });

  test('loads mentions', () => {
    return this.mastodon.getNewMentions().then((res) => {
      //expect(this.mastodon.client.getPath).toBe('statuses/mentions_timeline');
      //expect(res).toBe([]);
    });
  });

  test('filters mentions older than lastRun', () => {
    return this.mastodon.getNewMentions().then((res) => {
      //expect(this.mastodon.client.getPath).toBe('statuses/mentions_timeline');
      expect(res.length).toBe(0);
    });
  });

  test('loads new messages, mentions, and recent posts', () => {
    return this.mastodon.getNew().then(() => {
      expect(this.mastodon.messages.length).toBe(2);
      expect(this.mastodon.mentions.length).toBe(0);
      expect(this.mastodon.recentPosts.length).toBe(1);
    });
  });

  test('posts', () => {
    return this.mastodon.post('Some post text').then((res) => {
      expect(this.mastodon.client.postPath).toBe('statuses');
      expect(res.id).toBe(1);
    });
  });

  test('posts images', () => {
    return this.mastodon.postImage('Some post text', 'abc123').then((res) => {
      expect(this.mastodon.client.postPath).toBe('statuses');
      expect(this.mastodon.client.postOptions.media_ids).toEqual([1]);
      expect(res.id).toBe(1);
    });
  });

  test('loads recent posts', () => {
    return this.mastodon.getRecentPosts().then((res) => {
      expect(this.mastodon.client.getPath).toBe('accounts/:id/statuses');
      expect(this.mastodon.client.getOptions.id).toBe(123);
      expect(this.mastodon.user.id).toBe(123);
      expect(res.length).toBe(1);
    });
  });

  test('does not post if the latest post was created within the rate window', () => {
    let slowConfig = Object.assign({}, config, {rate: 10});
    let slowMastodon = new Mastodon(slowConfig);
    return slowMastodon.post('some message').then((res) => {
      expect(res.id).toBe(null);
    });
  });

});
