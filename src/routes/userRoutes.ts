import express from 'express';
import { create, index, login } from '../handlers/user';

const users = express.Router();

users.get('/', index);
users.post('/', create);
users.post('/login', login);

export default users;
