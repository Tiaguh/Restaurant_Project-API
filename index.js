import express from 'express';
import routes from './routes.js';
import cors from 'cors'
import { config } from 'dotenv';

config()

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', routes);

app.listen(3333, () => {
  console.log('Server is Running...');
});