import express from 'express';
import ExpressRouteAdapter from '../adapters/routes/express-route-adapter';
import ControllerFactory from '../factories/controller-factory';
import AuthMiddleware from '../server/middlewares/auth-middleware';

class ZipCodeRoutes {
  private routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.addFindZipCodeRoute();
  }

  addFindZipCodeRoute() {
    this.routes.get(
      '/zipcode/find/:zipCode',AuthMiddleware.auth,
      ExpressRouteAdapter.adaptRoute(ControllerFactory.makeGetZipCodeController())
    );
  }

  getRoutes() {
    return this.routes;
  }
}

export default new ZipCodeRoutes().getRoutes();
