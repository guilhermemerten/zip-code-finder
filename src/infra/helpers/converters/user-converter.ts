import UserEntity from "../../database/entities/user";
import User from '../../../domain/entities/user';

export default class UserConverter {
  static convertDBEntityToDomainEntity(dbEntity: UserEntity): User {
    return new User(dbEntity.username, dbEntity.password);
  }
}
