import db_client from '../database';
import { Product } from '../models/product';

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await db_client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  //   get 5 most expensive
  async topFive(): Promise<Product> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM products ORDER BY price DESC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
