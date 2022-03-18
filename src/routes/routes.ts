import express, { Response, Request } from 'express';
const routes = express.Router();
import { logger } from '../middleware/logger';

routes.get('/continent', logger, (req: Request, res: Response) => {
  res.send('Success!');
});
routes.get('/country', logger, (req: Request, res: Response) => {
  res.send('Success!');
});
routes.get('/state', (req: Request, res: Response) => {
  res.send('Success!');
});

export default routes;
