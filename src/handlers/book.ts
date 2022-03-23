import { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';

const bookStore = new BookStore();

// handler function to access the index method to get all books
export const index = async (req: Request, res: Response) => {
  try {
    const books = await bookStore.index();
    if (books.length < 1) {
      return res.json({ message: 'Books table is empty' });
    }
    res.json({ status: 200, books });
  } catch (error) {
    console.error(error);
    res.json({ message: 'failed to get books' });
  }
};

//handler function for create book method
export const create = async (req: Request, res: Response) => {
  try {
    const newBook: Book = req.body;
    const result = await bookStore.create(newBook);
    res.json({ status: 201, message: 'New book created', result });
  } catch (error) {
    console.error(error);
    res.json({ message: 'error creating book!' });
  }
};

// getting a single book handler
export const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await bookStore.show(id);
    if (!result) {
      return res.json({ message: 'No book with that id' });
    }
    res.json({ status: 200, data: result });
  } catch (error) {
    throw new Error(`cannot get book with id: ${id}`);
  }
};

// updating book handler
export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedBook: Book = req.body;
    const result = await bookStore.update(id, updatedBook);
    res.json({ status: 201, message: 'Book updated successfully', result });
  } catch (error) {
    throw new Error(`could not update book with id ${id}`);
  }
};

// delete book handler
export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await bookStore.delete(id);
    if (!result) {
      return res.json({ message: `No book with id: ${id}` });
    }
    res.json({ message: 'Book deleted!', result });
  } catch (error) {
    throw new Error(`error deleting book: ${error}`);
  }
};
