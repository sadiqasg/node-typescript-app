import express from 'express';
import { addProduct, create, index, show } from '../handlers/order';
const orders = express.Router();

orders.get('/', index);
orders.get('/:id', show);
orders.post('/', create);
orders.post('/:id/products', addProduct);

export default orders;
