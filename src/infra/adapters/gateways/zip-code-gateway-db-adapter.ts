import { getRepository } from 'typeorm';
import ZipCodeConverter from "../../helpers/converters/zip-code-converter";
import ZipCodeGateway from '../../../domain/gateways/zip-code-gateway';
import ZipCodeEntity from '../../database/entities/zip-code';
import Logger from '../../helpers/log/logger';
import ZipCode from '../../../domain/entities/zip-code';

 class MySqlGatewayAdapter implements ZipCodeGateway {
  private logger = Logger.getInstance();

  async findZipCode(zipCode: string): Promise<ZipCode> {
    const zipCodeEntity: ZipCodeEntity = await getRepository(ZipCodeEntity).findOne({
      zipcode: zipCode
    });

    if(zipCodeEntity === undefined){
      return null;
    }

    this.logger.debug(`Zip code`, zipCodeEntity);

    const zipCodeDomainEntity: ZipCode = ZipCodeConverter.convertDBEntityToDomainEntity(
      zipCodeEntity
    );
    return zipCodeDomainEntity;
  }
}

export default new MySqlGatewayAdapter();
