import AuthenticateUserUseCase from '../../../src/domain/use-cases/authenticate-user-use-case';
import userGatewayAdapter from '../../../src/infra/adapters/gateways/user-gateway-adapter';
import AuthenticateUserController from '../../../src/controllers/user/authenticate-user-controller'
import { HttpRequest } from '../../../src/controllers/interfaces/http';

describe('Testing Authenticate Controller', () => {
    it('Should return a token ', async () => {
        const authenticateUser = jest.spyOn(AuthenticateUserUseCase.prototype,'authenticateUser');
        authenticateUser.mockImplementation(()=>{
            return Promise.resolve('token_de_exemplo');
        });
        const controller = new AuthenticateUserController(userGatewayAdapter);
        const httpRequest:HttpRequest = {
            body:{
                userName: 'teste',
                password: 'teste'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.body.token).toBeDefined();
        authenticateUser.mockClear();
    });


    it('Should return a error', async () => {
        const authenticateUser = jest.spyOn(AuthenticateUserUseCase.prototype,'authenticateUser');
        authenticateUser.mockImplementation(()=>{
            return Promise.resolve('token_de_exemplo');
        });
        const controller = new AuthenticateUserController(userGatewayAdapter);
        const httpRequest:HttpRequest = {
            body:{
                userName: 'teste'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.statusCode).toBe(400)
    });


    it('Should return a error', async () => {
        const authenticateUser = jest.spyOn(AuthenticateUserUseCase.prototype,'authenticateUser');
        authenticateUser.mockRejectedValue(()=> Promise.reject(new Error('Wrong user or password.')));
        const controller = new AuthenticateUserController(userGatewayAdapter);
        const httpRequest:HttpRequest = {
            body:{
                userName: 'teste',
                password: 'teste'
            }
        }
        const response = await controller.handle(httpRequest);
        expect(response.statusCode).toBe(500);
    });
});