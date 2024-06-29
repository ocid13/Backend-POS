import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct, getCategories, getUnits, deleteProduct, deleteMultipleProducts } from './handler.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.get('/products', getProducts);
app.post('/products/add', addProduct);
app.get('/categories', getCategories);
app.get('/units', getUnits);
app.delete('/products/:id', deleteProduct);
app.post('/products/delete-multiple', deleteMultipleProducts);

export default app;
