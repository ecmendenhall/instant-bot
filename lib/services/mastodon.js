const Masto = require('mastodon');
const moment = require('moment');

class Mastodon {

  constructor(config) {
    this.config = config;
    this.client = new Masto(config.credentials);
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

  filterSeen(res) {
    return res.data.filter((message) => {
      let created_at = moment(
        message.created_at
      );
      return created_at >= this.config.lastRun;
    });
  }

  getNewMessages() {
    return this.client.get('timelines/home').then(
      this.filterSeen
    );
  }

  getNewMentions() {
    return new Promise((res, rej) => { res([])});
    //return this.client.get('statuses/mentions_timeline').then(
    //  this.filterSeen
    //);
  }

  getLastPostTime() {
    return this.getRecentPosts().then((posts) => {
      if (posts.length === 0) {
        return moment().subtract(this.config.rate, 'minutes');
      }
      let latest = posts[0];
      let created_at = moment(
        latest.created_at
      );
      return created_at;
    });
  }

  checkRateLimit() {
    return this.getLastPostTime().then((created_at) => {
      return created_at < moment().subtract(this.config.rate, 'minutes'); 
    });
  }

  postImage(statusText, imageData) {
    return this.checkRateLimit().then((ok) => {
      if (ok) {
        return this.client.post('media', {file: Buffer.from(imageData, 'base64')}).then((res) => {
          return res.data.id;
        }).then((id) => {
          return this.client.post('statuses', {
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
        return this.client.post('statuses', {
          status: statusText
        });
      } else {
        return {id: null};
      }
    });
  }

  getRecentPosts() {
    return this.client.get('accounts/verify_credentials').then((res) => {
      this.user = res.data;
      return res.data.id;
    }).then((id) => {
      return this.client.get('accounts/:id/statuses', {id: id});
    }).then((res) => {
      return res.data;
    });
  }

}

module.exports = Mastodon;
