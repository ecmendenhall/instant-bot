const server = require('./server');
const request = require('supertest');

describe('server', () => {

  test('server returns OK on ping', () => {
    return request(server).get('/').expect(200);
  });

});
