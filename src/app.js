import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getProducts, addProduct, getCategories, getUnits, deleteProduct, deleteMultipleProducts, getDataCustomer, getCustomerById, editCustomer, searchDataCustomer, deleteMultipleCustomer} from './handler.js';

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
app.post('/products/delete-multiple', deleteMultipleProducts);
app.get('/customer', getDataCustomer)
app.get('/customer/:id', getCustomerById)
app.get('/customer/search/:search', searchDataCustomer)
app.post('/customer/edit', editCustomer)
app.post('/customer/delete-multiple', deleteMultipleCustomer)

export default app;
