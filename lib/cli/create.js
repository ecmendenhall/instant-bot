const inquirer = require('inquirer');
const process = require('child_process');

const TEMPLATE_URL  = 'https://github.com/ecmendenhall/serverless-instant-bot/tree/master/';

const questions = [
  {
    type: 'input',
    name: 'botName',
    message: 'What is this bot called?'
  },
  {
    type: 'list',
    name: 'service',
    choices: ['Twitter', 'Mastodon'],
    message: 'What service will this bot use?',
    filter: v => v.toLowerCase()
  }
];

class Create {

  getTemplate(answers) {
    return `${ TEMPLATE_URL }${ answers.service }/`
  }

  run() {
    console.log("⚡️ 🤖  Let's make an instant bot!");
    return inquirer.prompt(questions).then((answers) => {
      console.log("⚡️  Creating a new serverless application...");
      process.spawn('serverless', ['install', '-u', this.getTemplate(answers), '-n', answers.botName], {stdio: 'inherit', env: process.env});
    });
  }
}

module.exports = Create;
