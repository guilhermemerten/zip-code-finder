import * as supertest from 'supertest';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import app from '../../src/infra/server/server';
import UserEntity from '../../src/infra/database/entities/user';

const mockUserRepository = mock<Repository<UserEntity>>();
const userEntity = new UserEntity();
userEntity.username = 'user';
userEntity.password = '$2b$10$JqwRzy6MoPrtXkoBoRVDW.gthdGJ4bpRuAC6dliL/SH2SDjjgqgD6';
const returnUserFindOneMock = Promise.resolve(userEntity);

const userEntityError = new UserEntity();
userEntityError.username = 'user';
userEntityError.password = 'hash';
const returnUserFindOneMockError = Promise.resolve(userEntityError);

jest.mock('typeorm', () => {
  return {
    createConnection: () => {},
    getRepository: () => mockUserRepository,
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

describe('Testing user routes', () => {
  it('should return a successful response for POST /user/auth', done => {
    mockUserRepository.findOne.mockReturnValue(returnUserFindOneMock);
    agent
      .post('/user/auth')
      .send({
        userName: 'user',
        password: 'magalu'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  it('should return a error response for POST /user/auth', done => {
    mockUserRepository.findOne.mockReset();
    mockUserRepository.findOne.mockReturnValue(returnUserFindOneMockError);
    agent
      .post('/user/auth')
      .send({
        userName: 'user',
        password: 'teste'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401)
      .end(err => {
        if (err) throw err;
        done();
      });
  });
});

afterAll(async done => {
  jest.resetModules();
  return server && server.close(done);
});
