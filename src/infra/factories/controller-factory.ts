import GetZipCodeController from "../../controllers/zip-code/get-zip-code-controller";
import Controller from "../../controllers/interfaces/controller";
import zipCodeDbGatewayAdapter from '../adapters/gateways/zip-code-gateway-db-adapter'

export default class ControllerFactory{

    static makeGetZipCodeController(): Controller{
        return new GetZipCodeController(zipCodeDbGatewayAdapter);
    }
}