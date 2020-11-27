import express from 'express';
import process from 'process';

class UtilRoutes {
  private routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.addRouteHealthCheck();
    this.addRouteStatistics();
  }

  addRouteHealthCheck() {
    this.routes.get(`/healthcheck`, async (req, res) => {
      res.status(200).json({ status: 'UP' });
    });
  }

  addRouteStatistics() {
    this.routes.get(`/statistics`, async (req, res) => {
      const memoryUsage = process.memoryUsage();
      const upTime = process.uptime();
      const cpuUsage = process.cpuUsage();
      res.status(200).json({ memoryUsage, upTime, cpuUsage });
    });
  }

  getRoutes() {
    return this.routes;
  }
}

export default new UtilRoutes().getRoutes();
