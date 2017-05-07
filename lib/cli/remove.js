const process = require('child_process');

class Logs {

  run() {
    process.spawn('serverless', ['remove'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Logs;
