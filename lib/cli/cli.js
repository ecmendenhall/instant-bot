const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'botName',
    message: 'What is this bot called?'
  },
  {
    type: 'list',
    name: 'service',
    choices: ['Twitter'],
    message: 'What service will this bot use?',
    filter: v => v.toLowerCase()
  }
];

class CLI {

  static run() {
    console.log("⚡️ 🤖  Let's make an instant bot!")
    inquirer.prompt(questions).then((answers) => {
      console.log(answers);
    })
  }
}

module.exports = CLI;
