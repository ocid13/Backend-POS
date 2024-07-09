import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct, getCategories, getUnits, deleteProducts, searchProducts, editProducts, getProductById } from './handler.js';

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
app.get('/products/:id', getProductById); // Route to fetch a single product by ID
app.post('/products/edit', editProducts);

export default app;
