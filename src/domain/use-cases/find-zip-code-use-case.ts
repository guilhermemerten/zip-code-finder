import ZipCode from '../entities/zip-code';
import ZipCodeGateway from '../gateways/zip-code-gateway';

export default class FindZipCodeUseCase {
  private readonly zipCodeGateway;

  constructor(zipCodeGateway: ZipCodeGateway) {
    this.zipCodeGateway = zipCodeGateway;
  }

  async findZipCode(zipCode: string): Promise<ZipCode> {
    return this.zipCodeGateway.findZipCode(zipCode);
  }
}
