import db_client from '../database';

export type Book = {
  id: number;
  title: string;
  total_pages: number;
  author: string;
  type: string;
  summary: string;
};

export class BookStore {
  // method to get all books
  async index(): Promise<Book[]> {
    try {
      const conn = await db_client.connect();
      const sql = 'SELECT * FROM books';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get book ${error}`);
    }
  }
  // method to create a book
  async create(book: Book): Promise<Book[]> {
    try {
      const conn = await db_client.connect();
      const sql =
        'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const newBook = Object.values(book);
      const result = await conn.query(sql, newBook);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not create book ${error}`);
    }
  }
  // method to get a single book
  async show(id: string): Promise<Book[]> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';
      const conn = await db_client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not get book with id ${id}: ${error}`);
    }
  }
  // method to update book
  async update(id: string, book: Book): Promise<Book[]> {
    try {
      const sql = `UPDATE books SET title=($1), author=($2), total_pages=($3), type=($4), summary=($5) WHERE id=${id} RETURNING *`;
      const conn = await db_client.connect();
      const updatedBook = Object.values(book);
      const result = await conn.query(sql, updatedBook);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  // method to delete a book
  async delete(id: string): Promise<Book[]> {
    try {
      const sql = 'DELETE FROM books WHERE id = ($1) RETURNING *';
      const conn = await db_client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`failed to delete book with id: ${id}, error: ${error}`);
    }
  }
}
