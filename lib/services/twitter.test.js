const Twitter = require('./twitter');
jest.mock('twit');
const Twit = require('twit');
const moment = require('moment');

const config = {
  lastRun: moment('Sat May 06 23:01:00 +0000 2017', 'dd MMM DD HH:mm:ss ZZ YYYY', 'en'),
  credentials: {
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  access_token: 'access_token',
  access_token_secret: 'access_token_secret'
}};

describe('Twitter service', () => {

  beforeEach(() => {
    this.twitter = new Twitter(config);
  })

  test('exists', () => {
    expect(Twitter).not.toBe(null);
  });

  test('sets up a client', () => {
    expect(this.twitter.client).toBeInstanceOf(Twit);
  });

  test('loads messages', () => {
    return this.twitter.getNewMessages().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/home_timeline');
      expect(res[0].text).toBe('Some tweet text');
    });
  });

  test('filters messages older than lastRun', () => {
    return this.twitter.getNewMessages().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/home_timeline');
      expect(res.length).toBe(2);
    });
  });

  test('handles errors', () => {
    this.twitter.client.raiseErrors = true;
    return this.twitter.getNewMessages().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/home_timeline');
      expect(res).toEqual([]);
    });
  });

  test('loads mentions', () => {
    return this.twitter.getNewMentions().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/mentions_timeline');
      expect(res[0].text).toBe('Some mention text');
    });
  });

  test('filters mentions older than lastRun', () => {
    return this.twitter.getNewMentions().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/mentions_timeline');
      expect(res.length).toBe(2);
    });
  });

  test('handles errors', () => {
    this.twitter.client.raiseErrors = true;
    return this.twitter.getNewMentions().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/mentions_timeline');
      expect(res).toEqual([]);
    });
  });

  test('loads new messages, mentions, and recent posts', () => {
    return this.twitter.getNew().then(() => {
      expect(this.twitter.messages.length).toBe(2);
      expect(this.twitter.mentions.length).toBe(2);
      expect(this.twitter.recentPosts.length).toBe(1);
    });
  });

  test('posts', () => {
    return this.twitter.post('Some post text').then((res) => {
      expect(this.twitter.client.postPath).toBe('statuses/update');
      expect(res.id).toBe(1);
    });
  });

  test('posts images', () => {
    return this.twitter.postImage('Some post text', 'abc123').then((res) => {
      expect(this.twitter.client.postPath).toBe('statuses/update');
      expect(this.twitter.client.postOptions.media_ids).toEqual(['1']);
      expect(res.id).toBe(1);
    });
  });

  test('loads recent posts', () => {
    return this.twitter.getRecentPosts().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/user_timeline');
      expect(this.twitter.client.getOptions.user_id).toBe('123');
      expect(this.twitter.user.id_str).toBe('123');
      expect(res.length).toBe(1);
    });
  });

  test('handles errors', () => {
    this.twitter.client.raiseErrors = true;
    return this.twitter.getRecentPosts().then((res) => {
      expect(this.twitter.client.getPath).toBe('statuses/user_timeline');
      expect(this.twitter.client.getOptions.user_id).toBe('123');
      expect(this.twitter.user.id_str).toBe('123');
      expect(res).toEqual([]);
    });
  });

  test('does not post if the latest post was created within the rate window', () => {
    let slowConfig = Object.assign({}, config, {rate: 10});
    let slowTwitter = new Twitter(slowConfig);
    return slowTwitter.post('some message').then((res) => {
      expect(res.id).toBe(null);
    });
  });

  test('posts if there are no recent posts found', () => {
    this.twitter.client.get = jest.fn(() => {
      return new Promise((res, rej) => {
        res({data: []});
      });
    });
    return this.twitter.post('some message').then((res) => {
      expect(this.twitter.client.postPath).toBe('statuses/update');
      expect(res.id).toBe(1);
    });
  });

  test('reposts', () => {
    return this.twitter.repost('1').then((res) => {
      expect(this.twitter.client.postPath).toBe('statuses/retweet/:id');
      expect(this.twitter.client.postOptions).toEqual({id: '1'});
      expect(res.id).toBe(1);
    });
  });

});
