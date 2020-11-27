import User from '../entities/user';
import UserGateway from '../gateways/user-gateway';

export default class AuthenticateUserUseCase {
  private readonly userGateway: UserGateway;

  constructor(userGateway: UserGateway) {
    this.userGateway = userGateway;
  }

  async authenticateUser(userName: string, password: string): Promise<string> {
    const user:User = await this.userGateway.findUser(userName);
    
    const verifiedPassword:boolean = await this.userGateway.verifyPassword(password, user.password);
    
    if(verifiedPassword){
        const jwtToken:string = await this.userGateway.generateJWT(user.userName);
        return jwtToken;
    }
    throw new Error('Wrong user or password.');
  }
}
