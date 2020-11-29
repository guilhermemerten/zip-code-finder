import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import utilRoutes from '../routes/util-routes';
import zipCodeRoutes from '../routes/zip-code-routes';
import userRoutes from '../routes/user-routes';
import Logger from '../helpers/log/logger';
import RequestTimeMiddleware from './middlewares/request-time-middleware';

const testEnvironment = process.env.NODE_ENV === 'test';
const swaggerDocument = require('../../../docs/swagger/swagger.json');

class ExpressServer {
  private logger = Logger.getInstance();

  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMySQLConnection();
    this.middleware();
    this.configureSwagger();
    this.configureRoutes();
    this.configurePort();
  }

  private async configureMySQLConnection() {
    try{
      await createConnection();
    }catch(error){
      this.logger.error('[ExpressServer] - constructor - Error connecting MySQL ');
    }
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

  private configureSwagger() {
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private configureRoutes() {
    this.app.use('/', utilRoutes);
    this.app.use('/', userRoutes);
    this.app.use('/', zipCodeRoutes);
  }
}

export default new ExpressServer().getApp();
