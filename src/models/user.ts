import bcrypt from 'bcrypt';
import db_client from '../database';

export type User = {
  id?: number | string;
  username: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const pepper: string = process.env.BCRYPT_PASSWORD;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const saltRounds: string = process.env.SALT_ROUNDS;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get users ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await db_client.connect();
      const sql =
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM users WHERE username = ($1)';
      const result = await conn.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          conn.release();
          return user;
        }
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
