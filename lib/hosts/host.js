const AWS = require('./aws');
const Glitch = require('./glitch');

const hosts = {
  'glitch': {
    class: Glitch,
    environment: {
      port: process.env.PORT,
      projectName: process.env.PROJECT_NAME
    }
  },
  'aws': {
    class: AWS,
    environment: {}
  }
}

class Host {
  static load(name) {
    let host = hosts[name];
    return new host.class(host.environment);
  }
}

module.exports = Host;
