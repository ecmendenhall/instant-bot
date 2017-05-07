const Config = require('./config');
const Service = require('./services/service');

class Bot {

  constructor(opts) {
    this.config = Config.parse(opts);
    this.service = Service.load(this.config.service, this.config);
  }

  post(message) {
    this.service.post(message);
  }

  run() {
    return this.service.getNew().then((newData) => {
      this.messages = newData.messages;
      this.mentions = newData.mentions;
      this.recentPosts = newData.recentPosts;
    }).then(() => {
      return this;
    });
  }

}

module.exports = Bot;
