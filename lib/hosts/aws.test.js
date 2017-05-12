const AWS = require('./aws');

describe('AWS', () => {

  test('calls its callback', () => {
    let aws = new AWS();
    let callback = jest.fn();
    aws.setup(callback);
    expect(callback.mock.calls.length).toBe(1);
  });

});
