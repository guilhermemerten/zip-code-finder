import express from 'express';
import ExpressRouteAdapter from '../adapters/routes/express-route-adapter';
import ControllerFactory from '../factories/controller-factory';

class UserRoutes {
  private routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.addAuthenticateRoute();
  }

  addAuthenticateRoute() {
    this.routes.post(
      '/user/auth',
      ExpressRouteAdapter.adaptRoute(ControllerFactory.makeAuthenticateUserController())
    );
  }

  getRoutes() {
    return this.routes;
  }
}

export default new UserRoutes().getRoutes();
