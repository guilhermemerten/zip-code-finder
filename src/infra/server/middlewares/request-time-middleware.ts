import { Request, Response } from 'express';
import Logger from '../../helpers/log/logger';

const logger = Logger.getInstance();

abstract class RequestTimeMiddleware {
  static responseTime(req: Request, res: Response, next: Function) {
    const start = Date.now();
    logger.info(`Request on ${req.originalUrl} received`);
    next();
    res.on('finish', () => {
      const requestTime = Date.now() - start;

      logger.info(`Request on ${req.originalUrl} Finished with status ${res.statusCode}`, {
        path: req.originalUrl,
        httpCode: res.statusCode,
        requestTime
      });
    });
  }
}

export default RequestTimeMiddleware;
