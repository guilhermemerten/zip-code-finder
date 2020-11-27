import * as supertest from 'supertest';
import app from '../../src/infra/server/server';

jest.mock('typeorm', () => {
  return {
    createConnection: () => {},
    getRepository: () => {},
    PrimaryColumn: () => {},
    Column: () => {},
    Entity: () => {}
  };
});

let server;
let agent;

beforeAll(async done => {
  server = app.listen('8080', () => {
    agent = supertest.agent(server, null);
    return done();
  });
});

describe('Testing util routes', () => {
  it('should return a successful response for GET /healthcheck', done => {
    agent
      .get('/healthcheck')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  
});

afterAll(async done => {
  return server && server.close(done);
});
