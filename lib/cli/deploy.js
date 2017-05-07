const process = require('child_process');

class Deploy {

  run() {
    process.spawn('serverless', ['deploy'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Deploy;
