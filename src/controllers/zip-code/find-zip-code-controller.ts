import Logger from '../../infra/helpers/log/logger';
import ZipCodeGateway from '../../domain/gateways/zip-code-gateway';
import FindZipCodeUseCase from '../../domain/use-cases/find-zip-code-use-case';
import ZipCode from '../../domain/entities/zip-code';
import Controller from '../interfaces/controller';
import { HttpRequest, HttpResponse } from '../interfaces/http';
import {
  makeSucessResponse,
  makeInternalServerErrorResponse,
  makeBadRequestResponse,
  makeNotFoundResponse
} from '../helpers/responses';

export default class FindZipCodeController implements Controller {
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
        return makeNotFoundResponse('Zip Code not found');
      }
      return makeSucessResponse(result);
    } catch (error) {
      this.logger.error(`[GetZipCodeController] - handle - Error: ${error.msg}`, error);
      return makeInternalServerErrorResponse('Internal Server Error');
    }
  }

  private async validateZipCodeParameter(zipCodeParameter: string): Promise<HttpResponse> {
    if (!/^[0-9]{8}$/.test(zipCodeParameter)) {
      return makeBadRequestResponse('Invalid Zip Code Parameter');
    }
    return null;
  }
}
