const server = require('./server');
const schedule = require('node-schedule');
const axios = require('axios');

class Glitch {

  constructor(environment={}) {
    this.environment = environment;
    this.ping = this.ping.bind(this);
  }

  setup(callback) {
    this.runBot = schedule.scheduleJob('*/1 * * * *', callback);
    this.pingApp = schedule.scheduleJob('*/4 * * * *', this.ping);
    server.listen(this.environment.port);
    return callback();
  }

  ping() {
    axios.get(`https://${ this.environment.projectName }.glitch.me/`);
  }

}

module.exports = Glitch;
