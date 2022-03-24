import { Request, Response, Application } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

export const productInOrders = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    if (!products.length) {
      return res.json({ message: 'Empty' });
    }
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

export const getTopFive = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.topFive();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const dashboardRoutes = (app: Application) => {
  app.get('/products_in_orders', productInOrders);
  app.get('/top-five', getTopFive);
};

export default dashboardRoutes;
