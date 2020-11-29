import User from '../../../src/domain/entities/user';
import AuthenticateUserUseCase from '../../../src/domain/use-cases/authenticate-user-use-case';
import userGatewayAdapter from '../../../src/infra/adapters/gateways/user-gateway-adapter';

describe('Testing Authenticate Use Case', () => {
  it('Should return a token', async () => {
    const findUser = jest.spyOn(userGatewayAdapter, 'findUser');
    findUser.mockImplementation((userName: string) => {
      const user = new User(
        userName,
        '$2b$10$JqwRzy6MoPrtXkoBoRVDW.gthdGJ4bpRuAC6dliL/SH2SDjjgqgD6'
      );
      return Promise.resolve(user);
    });
    const useCase = new AuthenticateUserUseCase(userGatewayAdapter);
    const token = await useCase.authenticateUser('teste', 'magalu');
    expect(token).toBeDefined();
    findUser.mockRestore();
  });

  it('Should not return a token', async () => {
    const findUser = jest.spyOn(userGatewayAdapter, 'findUser');
    findUser.mockImplementation(() => {
      return Promise.resolve(null);
    });
    const useCase = new AuthenticateUserUseCase(userGatewayAdapter);
    const token = await useCase.authenticateUser('teste', 'magalu');
    expect(token).toBeNull();
    findUser.mockRestore();
  });

  it('Should not return a token', async () => {
    const findUser = jest.spyOn(userGatewayAdapter, 'findUser');
    findUser.mockImplementation((userName: string) => {
      const user = new User(
        userName,
        '$2b$10$JqwRzy6MoPrtXkoBoRVDW.gthdGJ4bpRuAC6dliL/SH2SDjjgqgD6'
      );
      return Promise.resolve(user);
    });
    const useCase = new AuthenticateUserUseCase(userGatewayAdapter);
    const token = await useCase.authenticateUser('teste', 'teste');
    expect(token).toBeNull();
    findUser.mockRestore();
  });
});
