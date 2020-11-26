import ZipCode from "../entities/zip-code";

export default interface ZipCodeGateway{
    findZipCode(zipCode:string):Promise<ZipCode>;
}