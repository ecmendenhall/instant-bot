const Twit = require('twit');
const moment = require('moment');

class Twitter {

  constructor(config) {
    this.config = config;
    this.client = new Twit(config.credentials);
    this.filterSeen = this.filterSeen.bind(this);
  }

  getNew() {
    return Promise.all([
      this.getNewMessages().then(
        (messages) => { this.messages = messages; }
      ),
      this.getNewMentions().then(
        (mentions) => { this.mentions = mentions; }
      ),
      this.getRecentPosts().then(
        (recentPosts) => { this.recentPosts = recentPosts; }
      )
    ]).then(() => {
      return {
        messages: this.messages,
        mentions: this.mentions,
        recentPosts: this.recentPosts
      };
    });
  }

  catchErrors(res) {
    if (res.errors) {
      res.data = [];
    }
    return res;
  }

  filterSeen(res) {
    return res.data.filter((message) => {
      let created_at = moment(
        message.created_at,
        'dd MMM DD HH:mm:ss ZZ YYYY',
        'en'
      );
      return created_at >= this.config.lastRun;
    });
  }

  getNewMessages() {
    return this.client.get('statuses/home_timeline').then(
      this.catchErrors
    ).then(
      this.filterSeen
    );
  }

  getNewMentions() {
    return this.client.get('statuses/mentions_timeline').then(
      this.catchErrors
    ).then(
      this.filterSeen
    );
  }

  getLastPostTime() {
    return this.getRecentPosts().then((posts) => {
      if (posts.length === 0) {
        return moment().subtract(this.config.rate, 'minutes');
      }
      let latest = posts[0];
      let created_at = moment(
        latest.created_at,
        'dd MMM DD HH:mm:ss ZZ YYYY',
        'en'
      );
      return created_at;
    })
  }

  checkRateLimit() {
    return this.getLastPostTime().then((created_at) => {
      return created_at <= moment().subtract(this.config.rate, 'minutes');
    });
  }

  postImage(statusText, imageData) {
    return this.checkRateLimit().then((ok) => {
      if (ok) {
        return this.client.post('media/upload', {media_data: imageData}).then((res) => {
          return res.data.media_id_string;
        }).then((id) => {
          return this.client.post('statuses/update', {
            status: statusText,
            media_ids: [id]
          });
        });
      } else {
        return {id: null};
      }
    });
  }

  post(statusText) {
    return this.checkRateLimit().then((ok) => {
      if (ok) {
        return this.client.post('statuses/update', {
          status: statusText
        });
      } else {
        return {id: null};
      }
    });
  }

  repost(postId) {
    return this.client.post('statuses/retweet/:id', {id: postId});
  }

  getRecentPosts() {
    return this.client.get('account/verify_credentials').then((res) => {
      this.user = res.data;
      return res.data.id_str;
    }).then((id) => {
      return this.client.get('statuses/user_timeline', {user_id: id});
    }).then(
      this.catchErrors
    ).then((res) => {
      return res.data;
    });
  }

}

module.exports = Twitter;
