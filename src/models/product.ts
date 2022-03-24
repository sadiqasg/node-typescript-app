import db_client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`failed to get products, ${error}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await db_client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const newProduct = Object.values(product);
      const result = await conn.query(sql, newProduct);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create new product: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await db_client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get product with id ${id}: ${error}`);
    }
  }
}
