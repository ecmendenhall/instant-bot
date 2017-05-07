const process = require('child_process');

class Logs {

  run() {
    console.log();
    console.log("⚡️ 🤖  Removing your instant bot...");
    process.spawn('serverless', ['remove'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Logs;
