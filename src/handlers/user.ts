import { Request, Response } from 'express';
import { UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const tokenSecret: string = process.env.TOKEN_SECRET || '';

export const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    if (users.length < 1) {
      return res.json({ message: 'There are no users' });
    }
    res.json({ status: 200, users });
  } catch (error) {
    console.error(error);
    res.json({ message: 'failed to get users' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json({ status: 201, newUser, token });
  } catch (err) {
    console.error(err);
    res.json({ message: 'could not create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await store.authenticate(username, password);
    if (!result) {
      return res.json({ message: 'No user with that name found' });
    }
    const token = jwt.sign({ user: result }, tokenSecret, { expiresIn: '24h' });
    res.cookie('auth_token', token);
    res.json({ result, token });
  } catch (err) {
    console.error(err);
    res.json({ status: 400, err });
  }
};
