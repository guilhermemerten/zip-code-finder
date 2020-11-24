import express from 'express';

class UtilRoutes {
  private routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.addRouteHealthCheck();
  }

  addRouteHealthCheck() {
    this.routes.get(`/healthcheck`, (req, res) => {
      res.status(200).json({ status: 'UP' });
    });
  }

  getRoutes() {
    return this.routes;
  }
}

export default new UtilRoutes().getRoutes();
