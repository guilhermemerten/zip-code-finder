import Logger from '../../infra/helpers/log/logger';
import User from '../entities/user';
import UserGateway from '../gateways/user-gateway';

export default class AuthenticateUserUseCase {
  private logger = Logger.getInstance();

  private readonly userGateway: UserGateway;

  constructor(userGateway: UserGateway) {
    this.userGateway = userGateway;
  }

  async authenticateUser(userName: string, password: string): Promise<string> {
    const user:User = await this.userGateway.findUser(userName);

    if(!user){
      return null;
    }
    
    const verifiedPassword:boolean = await this.userGateway.verifyPassword(password, user.password);
    
    if(verifiedPassword){
        const jwtToken:string = await this.userGateway.generateJWT(user.userName);
        return jwtToken;
    }
    this.logger.error(`[AuthenticateUserUseCase] - authenticateUser - Password not verified`, {userName})
    return null;
  }
}
