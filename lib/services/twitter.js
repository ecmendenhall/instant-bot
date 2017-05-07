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
      )
    ]).then(() => {
      return {
        messages: this.messages,
        mentions: this.mentions
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
    return this.client.get('statuses/home_timeline').then(
      this.filterSeen
    );
  }

  getNewMentions() {
    return this.client.get('statuses/mentions_timeline').then(
      this.filterSeen
    );
  }

  post(statusText) {
    return this.client.post('statuses/update', {
      status: statusText
    });
  }

}

module.exports = Twitter;
