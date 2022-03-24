import express from 'express';
import { addProduct, create, index, show } from '../handlers/order';
import { verifyToken } from '../middlewares/verifyToken';
const orders = express.Router();

orders.get('/', index);
orders.get('/:id', show);
orders.post('/', create);
orders.post('/:id/products', verifyToken, addProduct);

export default orders;
