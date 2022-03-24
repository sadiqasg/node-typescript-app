import db_client from '../database';

export class DashboardQueries {
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await db_client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.id';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
