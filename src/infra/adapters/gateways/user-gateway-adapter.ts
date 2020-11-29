import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import Logger from "../../helpers/log/logger";
import UserGateway from '../../../domain/gateways/user-gateway';
import User from '../../../domain/entities/user';
import UserConverter from '../../helpers/converters/user-converter';
import UserEntity from '../../database/entities/user';
import {config} from '../../../config/config'

class UserGatewayAdapter implements UserGateway {
  private logger = Logger.getInstance();

  async findUser(userName: string): Promise<User> {
    const userEntity: UserEntity = await getRepository(UserEntity).findOne({
      username: userName
    });

    if (userEntity === undefined) {
      this.logger.info(`[UserGatewayAdapter] - findUser - User ${userName} not found`)
      return null;
    }

    const userDomainEntity: User = UserConverter.convertDBEntityToDomainEntity(userEntity);
    return userDomainEntity;
  }

  verifyPassword(password: string, passwordFromDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordFromDB);
  }

  async generateJWT(userName: string): Promise<string> {
    return jwt.sign({ user: userName }, process.env.JWT_SECRET, { expiresIn: config.jwt.expireTime });
  }
}

export default new UserGatewayAdapter();
