const process = require('child_process');

class Deploy {

  run() {
    console.log("⚡️ 🤖  Deploying your instant bot...");
    process.spawn('serverless', ['deploy'], {stdio: 'inherit', env: process.env});
  }

}

module.exports = Deploy;
