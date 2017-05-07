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
        message.created_at,
        'dd MMM DD HH:mm:ss ZZ YYYY',
        'en'
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

  post(statusText) {
    return this.getRecentPosts().then((posts) => {
      let latest = posts[0];
      let created_at = moment(
        latest.created_at,
        'dd MMM DD HH:mm:ss ZZ YYYY',
        'en'
      );
      return created_at;
    }).then((created_at) => {
      if (created_at < moment().subtract(this.config.rate, 'minutes')) {
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
      return this.client.get('accounts/:id/statuses', {user_id: id});
    }).then((res) => {
      return res.data;
    });
  }

}

module.exports = Mastodon;
