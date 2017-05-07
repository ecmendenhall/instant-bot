const Config = require('./config');
const Service = require('./services/service');

class Bot {

  constructor(opts) {
    this.config = Config.parse(opts);
    this.service = Service.load(this.config.service, this.config);
  }

  run() {
    return this.service.loadNew().then((newData) => {
      this.messages = newData.messages;
      this.mentions = newData.mentions;
    }).then(() => {
      return this;
    });
  }

}

module.exports = Bot;
