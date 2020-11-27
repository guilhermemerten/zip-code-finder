import AuthenticateUserController from "../../controllers/user/authenticate-user-controller";
import FindZipCodeController from "../../controllers/zip-code/find-zip-code-controller";
import Controller from "../../controllers/interfaces/controller";
import zipCodeGatewayAdapter from '../adapters/gateways/zip-code-gateway-adapter'
import userGatewayAdapter from '../adapters/gateways/user-gateway-adapter'

export default class ControllerFactory{

    static makeGetZipCodeController(): Controller{
        return new FindZipCodeController(zipCodeGatewayAdapter);
    }

    static makeAuthenticateUserController(): Controller{
        return new AuthenticateUserController(userGatewayAdapter);
    }
}