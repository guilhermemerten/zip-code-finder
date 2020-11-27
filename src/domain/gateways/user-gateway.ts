import User from "../entities/user";

export default interface UserGateway{
    findUser(userName:string):Promise<User>;
    verifyPassword(password:string, passwordFromDB: string):Promise<boolean>;
    generateJWT(userName:string):Promise<string>;
}