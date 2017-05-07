const process = require('child_process');

class Logs {

  run() {
    console.log("⚡️ 🤖  Loading logs from your instant bot...");
    process.spawn('serverless', ['logs', '-f', 'runBot'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Logs;
