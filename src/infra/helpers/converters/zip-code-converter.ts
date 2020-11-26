import ZipCodeEntity from "../../database/entities/zip-code";
import ZipCode from '../../../domain/entities/zip-code';

export default class ZipCodeConverter {
  static convertDBEntityToDomainEntity(dbEntity: ZipCodeEntity): ZipCode {
    return new ZipCode(dbEntity.zipcode, dbEntity.street, dbEntity.city, dbEntity.state);
  }
}
