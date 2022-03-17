import express, { Request, Response } from 'express';
import usersRoute from './routes/usersRoute';

require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/users', usersRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API v1' });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
