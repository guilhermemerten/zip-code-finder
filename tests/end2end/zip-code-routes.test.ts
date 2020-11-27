import * as supertest from 'supertest';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import app from '../../src/infra/server/server';
import userGatewaAdapter from '../../src/infra/adapters/gateways/user-gateway-adapter';
import ZipCodeEntity from '../../src/infra/database/entities/zip-code';

const mockZipCodeRepository = mock<Repository<ZipCodeEntity>>();
const zipCodeEntity = new ZipCodeEntity();
zipCodeEntity.zipcode = '99560000';
zipCodeEntity.city = 'Sarandi';
zipCodeEntity.state = 'RS';
zipCodeEntity.street = 'Avenida Sete de Setembro';
zipCodeEntity.neighborhood = 'Centro';
const returnZipCodeFindOneMock = Promise.resolve(zipCodeEntity);

jest.mock('typeorm', () => {
  return {
    createConnection: () => {},
    getRepository: () => mockZipCodeRepository,
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

describe('Testing zip code routes', () => {
  it('should return not found for GET /zipcode/find/:zipcode', async done => {
    mockZipCodeRepository.findOne.mockReturnValue(null);
    const token = await userGatewaAdapter.generateJWT('teste');
    agent
      .get('/zipcode/find/99560000')
      .set('x-access-token', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  it('should return sucessful for GET /zipcode/find/:zipcode', async done => {
    mockZipCodeRepository.findOne.mockReset();
    mockZipCodeRepository.findOne.mockReturnValue(returnZipCodeFindOneMock);
    const token = await userGatewaAdapter.generateJWT('teste');
    agent
      .get('/zipcode/find/99560000')
      .set('x-access-token', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  it('a forbidden response for GET /zipcode/find/:zipcode', async done => {
    const token = 'teste';
    agent
      .get('/zipcode/find/99560000')
      .set('x-access-token', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  it('should return a forbidden response for GET /zipcode/find/:zipcode', async done => {
    agent
      .get('/zipcode/find/99560000')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  it('should return a bad request for GET /zipcode/find/:zipcode', async done => {
    const token = await userGatewaAdapter.generateJWT('teste');
    agent
      .get('/zipcode/find/123')
      .set('x-access-token', token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(400)
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
