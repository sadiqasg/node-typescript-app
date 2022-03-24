import { Request, Response } from 'express';
import { OrderStore } from '../models/order';

const store = new OrderStore();
export const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    if (!orders.length) {
      return res.json({ message: 'No orders' });
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
      return res.json({ message: 'No order with that id' });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const result = await store.create(order);
    res.json({ status: 201, result });
  } catch (err) {
    console.error(err);
    res.json({ status: 400, err });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const addProduct = await store.addProduct(orderId, productId, quantity);
    res.json(addProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};
