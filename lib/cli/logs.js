const process = require('child_process');

class Logs {

  run() {
    process.spawn('serverless', ['logs', '-f', 'runBot'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Logs;
