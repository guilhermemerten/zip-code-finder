import express from 'express';
import bodyParser from 'body-parser';
import {createConnection} from 'typeorm';
import utilRoutes from '../routes/util-routes';
import zipCodeRoutes from '../routes/zip-code-routes';
import userRoutes from '../routes/user-routes';
import Logger from '../helpers/log/logger';
import RequestTimeMiddleware from './middlewares/request-time-middleware';
import AuthMiddleware from './middlewares/auth-middleware';

const testEnvironment = process.env.NODE_ENV === 'test';

class ExpressServer {
  private logger = Logger.getInstance();

  private app: express.Application;

  constructor() {
    this.app = express();
    createConnection();
    this.middleware();
    this.configureRoutes();
    this.configurePort();    
  }

  getApp() {
    return this.app;
  }

  private middleware() {
    this.app.disable('x-powered-by');
    this.app.disable('etag');
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(RequestTimeMiddleware.responseTime);
  }

  private configurePort() {
    if (!testEnvironment) {
      const port = process.env.NODE_PORT;
      this.app.listen(port, () => {
        this.logger.debug(`[ExpressServer] - configurePort - Server started on port ${port}`);
      });
    }
  }

  private configureRoutes() {
    this.app.use('/', utilRoutes);
    this.app.use('/', userRoutes);
    this.app.use('/', AuthMiddleware.auth, zipCodeRoutes);    
  }
}

export default new ExpressServer().getApp();
