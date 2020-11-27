/* eslint-disable no-await-in-loop */
import { getRepository } from 'typeorm';
import ZipCodeConverter from '../../helpers/converters/zip-code-converter';
import ZipCodeGateway from '../../../domain/gateways/zip-code-gateway';
import ZipCodeEntity from '../../database/entities/zip-code';
import Logger from '../../helpers/log/logger';
import ZipCode from '../../../domain/entities/zip-code';

class ZipCodeGatewayAdapter implements ZipCodeGateway {
  private logger = Logger.getInstance();

  async findZipCode(zipCode: string): Promise<ZipCode> {
    const zipCodeEntity: ZipCodeEntity = await this.findZipCodeAndSimilar(zipCode);

    if (zipCodeEntity === null) {
      return null;
    }

    this.logger.debug(`Zip code`, zipCodeEntity);

    const zipCodeDomainEntity: ZipCode = ZipCodeConverter.convertDBEntityToDomainEntity(
      zipCodeEntity
    );
    return zipCodeDomainEntity;
  }

  private async findZipCodeAndSimilar(zipCode: string): Promise<ZipCodeEntity> {
    const zipCodeCharArray: string[] = zipCode.split('');
  
    for (let i = zipCode.length; i > 1; i -= 1) {
      const zipCodeSearch = zipCodeCharArray.join('');
      const zipCodeEntity = await getRepository(ZipCodeEntity).findOne({
        zipcode: zipCodeSearch
      });
      zipCodeCharArray[i - 1] = '0';
      if (zipCodeEntity) {
        return zipCodeEntity;
      }
    }

    return null;
  }
}

export default new ZipCodeGatewayAdapter();
