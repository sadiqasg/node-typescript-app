import { Request, Response } from 'express';
import { ProductStore } from '../models/product';

const store = new ProductStore();

export const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    if (!orders.length) {
      return res.json({ message: 'No products' });
    }
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.json('request failed');
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await store.show(id);
    if (!result) {
      return res.json({ message: 'No product with that id' });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
    const result = await store.create(product);
    res.json({ status: 201, result });
  } catch (err) {
    console.error(err);
    res.json({ status: 400, err });
  }
};
