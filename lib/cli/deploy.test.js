const Deploy = require('./deploy');
jest.mock('child_process');
const process = require('child_process');

describe('Deploy', () => {

  test('it calls serverless with the correct args', () => {
    let deploy = new Deploy();
    deploy.run();
    expect(process.spawn.mock.calls).toMatchObject([['serverless', ['deploy'], {stdio: 'inherit'}]]);
  });

});
