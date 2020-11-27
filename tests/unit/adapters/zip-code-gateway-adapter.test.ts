import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import zipCodeGatewayAdapter from '../../../src/infra/adapters/gateways/zip-code-gateway-adapter';
import ZipCodeEntity from '../../../src/infra/database/entities/zip-code';

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

describe('Testing Zip Code Gateway Adapter', () => {
  it('should return a zip code', async () => {
    mockZipCodeRepository.findOne.mockReturnValue(returnZipCodeFindOneMock);
    const zipCode = await zipCodeGatewayAdapter.findZipCode('99560000');
    expect(zipCode.city).toBe('Sarandi');
  });
});
