import db_client from '../database';

type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`failed to get orders, ${error}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await db_client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const newOrder = Object.values(order);
      const result = await conn.query(sql, newOrder);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new order: ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await db_client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get order with id ${id}: ${error}`);
    }
  }

  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {
    try {
      const conn = await db_client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [orderId, productId, quantity]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add product ${productId}`);
    }
  }
}
