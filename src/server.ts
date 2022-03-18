import express, { Request, Response } from 'express';
import routes from './routes/routes';

require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/', routes);

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
