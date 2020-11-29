import FindZipCodeUseCase from '../../../src/domain/use-cases/find-zip-code-use-case';
import zipCodeGatewayAdapter from '../../../src/infra/adapters/gateways/zip-code-gateway-adapter';
import FindZipCodeController from '../../../src/controllers/zip-code/find-zip-code-controller'
import { HttpRequest } from '../../../src/controllers/interfaces/http';
import ZipCode from '../../../src/domain/entities/zip-code';

describe('Testing Find Zip Code Controller', () => {
    it('Should return a sucess response ', async () => {
        const findZipCode = jest.spyOn(FindZipCodeUseCase.prototype,'findZipCode');
        findZipCode.mockImplementation(()=>{
            const zipCode = new ZipCode('99560000', 'Avenida 7 de Setembro', 'Sarandi', 'RS', 'Centro');
            return Promise.resolve(zipCode);
        });
        const controller = new FindZipCodeController(zipCodeGatewayAdapter);
        const httpRequest:HttpRequest = {
            params:{
                zipCode: '99560000'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.body.city).toBeDefined();
        findZipCode.mockClear();
    });


    it('Should return a error response ', async () => {
        const findZipCode = jest.spyOn(FindZipCodeUseCase.prototype,'findZipCode');
        findZipCode.mockImplementation(()=>{
            const zipCode = new ZipCode('99560000', 'Avenida 7 de Setembro', 'Sarandi', 'RS', 'Centro');
            return Promise.resolve(zipCode);
        });
        const controller = new FindZipCodeController(zipCodeGatewayAdapter);
        const httpRequest:HttpRequest = {
            params:{
                zipCode: '995600'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.statusCode).toBe(400);
        findZipCode.mockClear();
    });

    it('Should return a error response ', async () => {
        const findZipCode = jest.spyOn(FindZipCodeUseCase.prototype,'findZipCode');
        findZipCode.mockImplementation(()=>{
            return Promise.resolve(null);
        });
        const controller = new FindZipCodeController(zipCodeGatewayAdapter);
        const httpRequest:HttpRequest = {
            params:{
                zipCode: '99560000'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.statusCode).toBe(404);
        findZipCode.mockClear();
    });


    it('Should return a error response ', async () => {
        const findZipCode = jest.spyOn(FindZipCodeUseCase.prototype,'findZipCode');
        findZipCode.mockRejectedValue(()=>{
            return Promise.reject(new Error('Generic Error'));
        });
        const controller = new FindZipCodeController(zipCodeGatewayAdapter);
        const httpRequest:HttpRequest = {
            params:{
                zipCode: '99560000'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.statusCode).toBe(500);
        findZipCode.mockClear();
    });

});