const Remove = require('./remove');
jest.mock('child_process');
const process = require('child_process');

describe('Remove', () => {

  test('it calls serverless with the correct args', () => {
    let remove = new Remove();
    remove.run();
    expect(process.spawn.mock.calls).toMatchObject([['serverless', ['remove'], {stdio: 'inherit'}]]);
  });

});
