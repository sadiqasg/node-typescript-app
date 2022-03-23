import express from 'express';
import { create, index, remove, show, update } from '../handlers/book';
import { verifyToken } from '../middlewares/verifyToken';

const books = express.Router();

books.get('/', index);
books.post('/', verifyToken, create);
books.get('/:id', show);
books.put('/:id', update);
books.delete('/:id', verifyToken, remove);

export default books;
