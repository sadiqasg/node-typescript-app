import express from 'express';
import { create, index, remove, show, update } from '../handlers/bookHandler';

const books = express.Router();

books.get('/', index);
books.post('/', create);
books.get('/:id', show);
books.put('/:id', update);
books.delete('/:id', remove);

export default books;
