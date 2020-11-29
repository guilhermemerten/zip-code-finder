import Logger from '../../infra/helpers/log/logger';
import UserGateway from '../../domain/gateways/user-gateway';
import AuthenticateUserUseCase from '../../domain/use-cases/authenticate-user-use-case';
import Controller from '../interfaces/controller';
import { HttpRequest, HttpResponse } from '../interfaces/http';
import {
  makeSucessResponse,
  makeInternalServerErrorResponse,
  makeBadRequestResponse,
  makeUnauthorizedResponse
} from '../helpers/responses';

export default class AuthenticateUserController implements Controller {
  private logger = Logger.getInstance();

  private readonly authenticateUserUseCase: AuthenticateUserUseCase;

  constructor(userGateway: UserGateway) {
    this.authenticateUserUseCase = new AuthenticateUserUseCase(userGateway);
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateParams = await this.validateParameters(
        httpRequest.body.userName,
        httpRequest.body.password
      );

      if (validateParams) {
        return validateParams;
      }

      const token = await this.authenticateUserUseCase.authenticateUser(
        httpRequest.body.userName,
        httpRequest.body.password
      );

      if(!token){
        return makeUnauthorizedResponse('Wrong username or password')
      }

      return makeSucessResponse({ token });
    } catch (error) {
      this.logger.error(`[AuthenticateUserController] - handle - Error: ${error.message}`, {
        error
      });
      return makeInternalServerErrorResponse('Internal Server Error');
    }
  }

  private async validateParameters(userName: string, password: string): Promise<HttpResponse> {
    if (!userName || !password) {
      return makeBadRequestResponse('Invalid Parameters');
    }
    return null;
  }
}
