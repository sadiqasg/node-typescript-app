import express, { Response, Request } from 'express';
const users = express.Router();

type User = {
  id: number;
  name: string;
  occupation: string;
};

const usersArray: Array<User> = [
  {
    id: 1,
    name: 'sadiq',
    occupation: 'Software Engineer',
  },
  {
    id: 2,
    name: 'fati',
    occupation: 'Product Designer',
  },
];

// get all users
users.get('/', (req: Request, res: Response) => {
  if (usersArray.length < 1) {
    res.json({ message: 'No users available' });
  } else {
    res.json({ message: usersArray });
  }
});

// get single user
users.get('/:id', (req: Request, res: Response) => {
  if (usersArray.length < 1) {
    return res.json({ message: 'No users available' });
  }
  const id = req.params.id;
  const singleUser = usersArray.filter((user) => {
    if (user.id === Number(id)) return user;
  });
  res.json({ message: singleUser });
});

// post add user
users.post('/', (req: Request, res: Response) => {
  const newUser: User = req.body;
  if (usersArray.length < 1) {
    return res.json({ message: 'No users available' });
  }
  usersArray.push(newUser);
  res.json({ message: 'New user added', newUser, usersArray });
});

// edit user
users.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (usersArray.length < 1) {
    return res.json({ message: 'No users available' });
  }

  const userUpdate = req.body;

  const foundIndex = usersArray.findIndex((element) => element.id === id);
  usersArray.splice(foundIndex, 1, userUpdate);

  res.json({ message: 'update successful', userUpdate, usersArray });
});

// delete user
users.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const foundIndex = usersArray.findIndex((user) => user.id === id);
  usersArray.splice(foundIndex, 1);
  res.json({ message: 'user deleted!', usersArray });
});

export default users;
