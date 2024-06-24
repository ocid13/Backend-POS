import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct } from './handler.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use routes
app.get('/products', getProducts);
app.post('/products/add', addProduct);

export default app;
