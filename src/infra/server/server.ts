import express from 'express';
import bodyParser from 'body-parser';
import utilRoutes from '../routes/util-routes';
import Logger from '../helpers/log/logger';

class ExpressServer {
  private logger: Logger = Logger.getInstance();

  private app: express.Application;

  constructor() {
    this.app = express();
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
  }

  private configurePort() {
    const port = process.env.NODE_PORT;
    this.app.listen(port, () => {
      this.logger.debug(`[ExpressServer] - configurePort - Server started on port ${port}`);
    });
  }

  private configureRoutes() {
    this.app.use('/', utilRoutes);
  }
}

export default new ExpressServer();
