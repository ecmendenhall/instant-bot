const Glitch = require('./glitch');
jest.mock('./server');
const server = require('./server');
jest.mock('node-schedule');
const schedule = require('node-schedule');
jest.mock('axios');
const axios = require('axios');

describe('Glitch', () => {

  test('sets up a scheduled job to run the bot', () => {
    let glitch = new Glitch();
    let callback = () => {};
    glitch.setup(callback);
    expect(schedule.scheduleJob.mock.calls[0][0]).toBe('*/1 * * * *')
    expect(schedule.scheduleJob.mock.calls[0][1]).toBe(callback);
  });

  test('sets up a scheduled job to ping the app', () => {
    let glitch = new Glitch();
    let callback = () => {};
    glitch.setup(callback);
    expect(schedule.scheduleJob.mock.calls[1][0]).toBe('*/4 * * * *')
    expect(schedule.scheduleJob.mock.calls[1][1]).toBe(glitch.ping);
  });

  test('pings the server', () => {
    let glitch = new Glitch({projectName: 'my-rad-bot'});
    glitch.ping();
    expect(axios.get.mock.calls[0][0]).toBe('https://my-rad-bot.glitch.me/');
  });

  test('starts the server', () => {
    let glitch = new Glitch({port: 8000});
    let callback = () => {};
    glitch.setup(callback);
    expect(server.listen.mock.calls[2][0]).toBe(8000);
  });

});
