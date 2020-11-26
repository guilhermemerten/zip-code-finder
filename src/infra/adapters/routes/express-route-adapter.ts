import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from '../../../controllers/interfaces/http';
import Controller from '../../../controllers/interfaces/controller';

class ExpressRouteAdapter {
  static adaptRoute(controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query
      };
      const httpResponse: HttpResponse = await controller.handle(httpRequest);

      if (httpResponse.file) {
        return res.status(httpResponse.statusCode).download(httpResponse.file);
      }

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return res.status(httpResponse.statusCode).json(httpResponse.body);
      }

      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      });
    };
  }
}

export default ExpressRouteAdapter;
