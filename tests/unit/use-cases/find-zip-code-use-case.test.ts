import ZipCode from '../../../src/domain/entities/zip-code';
import FindZipCodeUseCase from '../../../src/domain/use-cases/find-zip-code-use-case';
import zipCodeGatewayAdapter from '../../../src/infra/adapters/gateways/zip-code-gateway-adapter';

describe('Testing Find Zip Code Use Case', () => {
  it('Should return a Zip Code', async () => {
    const findZipCode = jest.spyOn(zipCodeGatewayAdapter, 'findZipCode');
    findZipCode.mockImplementation(() => {
      const zipCode = new ZipCode('99560000', 'Avenida 7 de Setembro', 'Sarandi', 'RS', 'Centro');
      return Promise.resolve(zipCode);
    });
    const useCase = new FindZipCodeUseCase(zipCodeGatewayAdapter);
    const zipCode = await useCase.findZipCode('99560000');
    expect(zipCode.city).toBe('Sarandi');
    findZipCode.mockRestore();
  });

  it('Should not return a Zip Code', async () => {
    const findZipCode = jest.spyOn(zipCodeGatewayAdapter, 'findZipCode');
    findZipCode.mockImplementation(() => {
      return Promise.resolve(null);
    });
    const useCase = new FindZipCodeUseCase(zipCodeGatewayAdapter);
    const zipCode = await useCase.findZipCode('99560000');
    expect(zipCode).toBeNull();
    findZipCode.mockRestore();
  });
});
