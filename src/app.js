import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct, getCategories, getUnits, deleteProduct, getProductsWithId } from './handler.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.get('/products', getProducts);
app.post('/products/add', addProduct);
app.get('/categories', getCategories);
app.get('/categories/:id', getProductsWithId);
app.get('/units', getUnits);
app.delete('/products/:id', deleteProduct);

export default app;
