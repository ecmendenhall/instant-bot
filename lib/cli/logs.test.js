const Logs = require('./logs');
jest.mock('child_process');
const process = require('child_process');

describe('Logs', () => {

  test('it calls serverless with the correct args', () => {
    let logs = new Logs();
    logs.run();
    expect(process.spawn.mock.calls).toMatchObject([['serverless', ['logs', '-f', 'runBot'], {stdio: 'inherit'}]]);
  });

});
