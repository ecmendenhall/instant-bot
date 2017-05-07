const Create = require('./create');
jest.mock('child_process');
const process = require('child_process');
jest.mock('inquirer');
const inquirer = require('inquirer');

describe('Create', () => {

  beforeEach(() => {
    this.log = console.log;
    console.log = jest.fn();
    inquirer.prompt = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          botName: 'my-rad-bot',
          service: 'twitter'
        });
      });
    });
  })

  afterEach(() => {
    console.log = this.log;
  })

  test('it calls serverless with the correct args', () => {
    let create = new Create();
    return create.run().then(() => {
      expect(process.spawn.mock.calls).toMatchObject([['serverless', ['install', '-u', 'https://github.com/ecmendenhall/serverless-instant-bot/tree/master/twitter/', '-n', 'my-rad-bot'], {stdio: 'inherit'}]]);
    });
  });

});
