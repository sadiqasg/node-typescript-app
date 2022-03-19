import express, { Request, Response } from 'express';
import csv from 'csvtojson';

require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const csvFilePath = './src/myfile.csv';

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API v1' });
});

app.get('/convert', async (req: Request, res: Response) => {
  const jsonFile = await csv().fromFile(csvFilePath);
  jsonFile.filter((i) => {
    if (i.phone === undefined) {
      i.phone = 'missing data';
    }
  });
  res.json({ status: 200, message: jsonFile });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'This route does not exist' });
});

app.listen(port, (): void => {
  console.log(`Listening on ${port}`);
});
