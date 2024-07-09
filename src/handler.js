import database from './database.js';

// Get Product
export const getProducts = (req, res) => {
  const query = `
    SELECT p.id, p.product_name, p.product_code, p.barcode, p.category, p.unit, p.selling_price, p.cost_of_product, p.product_initial_qty,
           c.category, u.unit
    FROM products p
    LEFT JOIN categories c ON p.category = c.id
    LEFT JOIN units u ON p.unit = u.id
  `;

  database.query(query, (err, rows) => {
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

// Add product
export const addProduct = (req, res) => {
  const {
    product_name,
    product_code,
    barcode,
    category,
    unit,
    selling_price,
    cost_of_product,
    product_initial_qty,
  } = req.body;

  if (!product_name || !selling_price || !cost_of_product || !product_initial_qty || !category || !unit) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be filled',
    });
  }

  const query = `
    INSERT INTO products (product_name, product_code, barcode, category, unit, selling_price, cost_of_product, product_initial_qty)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
  `;
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

// Get categories
export const getCategories = (req, res) => {
  database.query('SELECT * FROM categories', (err, rows) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: 'Successfully fetched categories',
      data: rows,
    });
  });
};

// Get units
export const getUnits = (req, res) => {
  database.query('SELECT * FROM units', (err, rows) => {
    if (err) {
      console.error('Error fetching units:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch units',
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: 'Successfully fetched units',
      data: rows,
    });
  });
};

// Search products
export const searchProducts = (req, res) => {
  const { search } = req.params;

  const query = `
    SELECT p.id, p.product_name, p.product_code, p.barcode, p.category, p.unit, p.selling_price, p.cost_of_product, p.product_initial_qty,
           c.category, u.unit
    FROM products p
    LEFT JOIN categories c ON p.category = c.id
    LEFT JOIN units u ON p.unit = u.id
    WHERE p.product_name LIKE ?
  `;
  const values = [`%${search}%`];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Error fetching search results:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch search results',
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: 'Successfully fetched search results',
      data: result,
    });
  });
};

// Delete product(s)
export const deleteProducts = (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No product IDs provided',
    });
  }

  const query = 'DELETE FROM products WHERE id IN (?)';
  
  database.query(query, [ids], (err, result) => {
    if (err) {
      console.error('Error deleting products:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete products',
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: 'Products deleted successfully',
    });
  });
};

// Fetch single product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT p.id, p.product_name, p.product_code, p.barcode, p.category, p.unit, p.selling_price, p.cost_of_product, p.product_initial_qty,
           c.category, u.unit
    FROM products p
    LEFT JOIN categories c ON p.category = c.id
    LEFT JOIN units u ON p.unit = u.id
    WHERE p.id = ?
  `;
  
  database.query(query, [id], (err, rows) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch product',
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: 'Successfully fetched product',
      data: rows,
    });
  });
};

export const editProducts = (req, res) => {
  const {
    id,
    product_name,
    product_code,
    barcode,
    category,
    unit,
    selling_price,
    cost_of_product,
    product_initial_qty,
  } = req.body;

  const query = `
    UPDATE products SET
      product_name = ?,
      product_code = ?,
      barcode = ?,
      category = ?,
      unit = ?,
      selling_price = ?,
      cost_of_product = ?,
      product_initial_qty = ?
    WHERE id = ?
  `;
  const values = [
    product_name,
    product_code,
    barcode,
    category,
    unit,
    selling_price,
    cost_of_product,
    product_initial_qty,
    id
  ];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to update product',
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        id,
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
}