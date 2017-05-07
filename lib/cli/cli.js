const Create = require('./create');
const Deploy = require('./deploy');
const Logs = require('./logs');
const Remove = require('./remove');
const yargs = require('yargs');

class CLI {

  create() {
    new Create().run();
  }

  deploy() {
    new Deploy().run();
  }

  logs() {
    new Logs().run();
  }

  remove() {
    new Remove().run();
  }

  run() {
    return yargs.command(
      'create',
      'Create a new instant bot.',
      this.create
    ).command(
      'deploy',
      'Deploy your instant bot.',
      this.deploy
    ).command(
      'logs',
      'See logs from your instant bot.',
      this.logs
    ).command(
      'remove',
      'Shut down your instant bot.',
      this.remove
    ).help().argv;
  }

}

module.exports = CLI;
