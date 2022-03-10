import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ status: 'Server is running', message: 'API v1' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
