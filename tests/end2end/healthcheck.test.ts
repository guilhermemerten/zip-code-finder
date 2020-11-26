import {Repository} from 'typeorm';
import * as supertest from 'supertest';
import { mock } from 'jest-mock-extended';
import app from '../../src/infra/server/server';
import ZipCodeEntity from '../../src/infra/database/entities/zip-code';

const mockRepository = mock<Repository<ZipCodeEntity>>();
const returnFindOneMock = Promise.resolve(new ZipCodeEntity());

mockRepository.findOne.mockReturnValue(returnFindOneMock);

jest.mock('typeorm', () => {
  return {
    createConnection: () => {},
    getRepository: () => mockRepository,
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

  it('should return a successful response for GET /healthcheck', done => {
    agent
      .get('/zipcode/find/99560000')
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
