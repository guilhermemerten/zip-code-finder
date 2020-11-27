import Logger from '../../infra/helpers/log/logger';
import ZipCodeGateway from '../../domain/gateways/zip-code-gateway';
import FindZipCodeUseCase from '../../domain/use-cases/find-zip-code-use-case';
import ZipCode from '../../domain/entities/zip-code';
import Controller from '../interfaces/controller';
import { HttpRequest, HttpResponse } from '../interfaces/http';

export default class GetZipCodeController implements Controller {
  private logger = Logger.getInstance();

  private readonly findZipCodeUseCase: FindZipCodeUseCase;

  constructor(zipCodeGateway: ZipCodeGateway) {
    this.findZipCodeUseCase = new FindZipCodeUseCase(zipCodeGateway);
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const zipCodeParameter = httpRequest.params.zipCode;
      this.logger.debug(`[GetZipCodeController] - handle - zipcodeparameter: ${zipCodeParameter}`);

      const validateCep = await this.validateZipCodeParameter(zipCodeParameter);

      if (validateCep) {
        return validateCep;
      }

      const result: ZipCode = await this.findZipCodeUseCase.findZipCode(zipCodeParameter);
      if (result === null) {
        return {
          statusCode: 404,
          body: 'Zip Code not found'
        };
      }
      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      this.logger.error(`[GetZipCodeController] - handle - Error: ${error.msg}`, error);
      return {
        statusCode: 500,
        body: 'Internal Server Error'
      };
    }
  }

  private async validateZipCodeParameter(zipCodeParameter: string): Promise<HttpResponse> {
    if (!/^[0-9]{8}$/.test(zipCodeParameter)) {
      return {
        statusCode: 400,
        body: 'Invalid Zip Code Parameter'
      };
    }
    return null;
  }
}
