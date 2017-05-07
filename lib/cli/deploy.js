const process = require('child_process');

class Deploy {

  run() {
    process.spawn('serverless', ['deploy'], {stdio: 'inherit'});
  }

}

module.exports = Deploy;
