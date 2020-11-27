import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Logger from '../../helpers/log/logger';

const logger = Logger.getInstance();

abstract class AuthMiddleware {
  // eslint-disable-next-line consistent-return
  static auth(req: Request, res: Response, next: Function): void | Response {
    const token: string = req.header('x-access-token');
    
    if (!token) {
      return res.status(403).json({ error: 'No token provided.' });
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(error){
        logger.error(`[AuthMiddleware] - auth - Error: ${error.message}`);
        return res.status(403).json({ error: 'Invalid access token' });
    }

  }
}

export default AuthMiddleware;
