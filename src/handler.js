import database from './database.js';

export const getProducts = (req, res) => {
  database.query('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products data',
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: 'Success fetched products data',
      data: rows,
    });
  });
};

export const addProduct = (req, res) => {
  const {
    product_name,
    product_code,
    barcode,
    category,
    selling_price,
    cost_of_product,
    product_initial_qty,
    unit,
  } = req.body;

  // validate input
  if (!product_name || !selling_price || !cost_of_product || !product_initial_qty) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be filled',
    });
  }

  const query =
    'INSERT INTO products (product_name, product_code, barcode, category, unit, selling_price, cost_of_product, product_initial_qty) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    product_name,
    product_code,
    barcode,
    category,
    unit,
    selling_price,
    cost_of_product,
    product_initial_qty,
  ];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to add product',
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: {
        id: result.insertId,
        product_name,
        product_code,
        barcode,
        category,
        unit,
        selling_price,
        cost_of_product,
        product_initial_qty,
      },
    });
  });
};
