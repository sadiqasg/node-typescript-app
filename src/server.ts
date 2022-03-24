import express, { Request, Response } from 'express';
import books from './routes/bookRoutes';
import users from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import orders from './routes/orderRoutes';
import products from './routes/productRoutes';
import dashboardRoutes from './handlers/dashboard';

require('dotenv').config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT;
app.use(express.json());
app.use('/books', books);
app.use('/user', users);
app.use('/orders', orders);
app.use('/products', products);
dashboardRoutes(app);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ app: 'Book API v1', message: 'Navigate to /books' });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
