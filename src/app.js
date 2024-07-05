import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct, getCategories, getUnits, deleteProducts, searchProducts } from './handler.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.get('/products', getProducts);
app.post('/products/add', addProduct);
app.get('/categories', getCategories);
app.get('/units', getUnits);
app.post('/products/delete', deleteProducts);
app.get('/products/search/:search', searchProducts);

export default app;
