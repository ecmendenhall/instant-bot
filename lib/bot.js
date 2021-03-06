const Config = require('./config');
const Service = require('./services/service');
const Host = require('./hosts/host');

class Bot {

  constructor(opts) {
    this.config = Config.parse(opts);
    this.host = Host.load(this.config.host);
    this.service = Service.load(this.config.service, this.config);
    this.client = this.service.client;
  }

  postImage(message, imageData) {
    return this.service.postImage(message, imageData);
  }

  post(message) {
    return this.service.post(message);
  }

  run(onRun) {
    return this.host.setup(() => {
      return this.service.getNew().then((newData) => {
        this.messages = newData.messages;
        this.mentions = newData.mentions;
        this.recentPosts = newData.recentPosts;
        onRun(this);
      }).then(() => {
        return this;
      }).catch((err) => {
        console.log(err);
      });
    });
  }

}

module.exports = Bot;
