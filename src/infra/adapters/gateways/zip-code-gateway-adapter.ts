import { getRepository, In } from 'typeorm';
import ZipCodeConverter from '../../helpers/converters/zip-code-converter';
import ZipCodeGateway from '../../../domain/gateways/zip-code-gateway';
import ZipCodeEntity from '../../database/entities/zip-code';
import Logger from '../../helpers/log/logger';
import ZipCode from '../../../domain/entities/zip-code';

class ZipCodeGatewayAdapter implements ZipCodeGateway {
  private logger = Logger.getInstance();

  async findZipCode(zipCode: string): Promise<ZipCode> {
    let zipCodeEntity: ZipCodeEntity = await getRepository(ZipCodeEntity).findOne({
      zipcode: zipCode
    });

    if (!zipCodeEntity) {
      zipCodeEntity = await this.tryToFindSimilarZipCode(zipCode);
      if (!zipCodeEntity) {
        return null;
      }
    }

    this.logger.debug(`Zip code`, zipCodeEntity);

    const zipCodeDomainEntity: ZipCode = ZipCodeConverter.convertDBEntityToDomainEntity(
      zipCodeEntity
    );
    return zipCodeDomainEntity;
  }

  private async tryToFindSimilarZipCode(zipCode: string): Promise<ZipCodeEntity> {
    const zipCodeCharArray: string[] = zipCode.split('');
    const zipCodeWhereItems: string[] = [];
    for (let i = zipCode.length; i > 1; i -= 1) {
      zipCodeCharArray[i - 1] = '0';
      const zipCodeSearch = zipCodeCharArray.join('');
      zipCodeWhereItems.push(zipCodeSearch);
    }

    const zipCodeEntity = await getRepository(ZipCodeEntity).findOne({
      where: { zipcode: In(zipCodeWhereItems) },
      order: { zipcode: 'DESC' }
    });

    return zipCodeEntity;
  }
}

export default new ZipCodeGatewayAdapter();
