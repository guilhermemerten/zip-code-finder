import { mock } from "jest-mock-extended";
import { Repository } from "typeorm";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserEntity from "../../../src/infra/database/entities/user";
import userGatewayAdapter from '../../../src/infra/adapters/gateways/user-gateway-adapter';

const mockUserRepository = mock<Repository<UserEntity>>();
const userEntity = new UserEntity();
userEntity.username = 'user';
userEntity.password = '$2b$10$JqwRzy6MoPrtXkoBoRVDW.gthdGJ4bpRuAC6dliL/SH2SDjjgqgD6';
const returnUserFindOneMock = Promise.resolve(userEntity);
const returnUserFindOneNull = Promise.resolve(undefined);

jest.mock('typeorm', () => {
    return {
      createConnection: () => {},
      getRepository: () => mockUserRepository,
      PrimaryColumn: () => {},
      Column: () => {},
      Entity: () => {}
    };
  });

describe('Testing User Gateway Adapter', () => {
    it('should return a user', async () => {
        mockUserRepository.findOne.mockReturnValue(returnUserFindOneMock);
        const user = await userGatewayAdapter.findUser('user');
        expect(user.userName).toBe('user');
    });

    it('should not return a user', async () => {
        mockUserRepository.findOne.mockReturnValue(returnUserFindOneNull);
        const user = await userGatewayAdapter.findUser('user');
        expect(user).toBe(null);
    });

    it('should return a valid token', async () => {
        const token = await userGatewayAdapter.generateJWT('username');
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        expect(verified).toBeDefined();
    });

    it('should return a valid password', async () => {
        const hash = bcrypt.hashSync('teste',10);
        const verified = await userGatewayAdapter.verifyPassword('teste', hash);
        expect(verified).toBe(true);
    });
});