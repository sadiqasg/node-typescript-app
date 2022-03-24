import express from 'express';
import { create, index, show } from '../handlers/product';
const products = express.Router();

products.get('/', index);
products.get('/:id', show);
products.post('/', create);

export default products;
