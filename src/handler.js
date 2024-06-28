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

export const getProductsWithId = (req,res) => {
  const { id } = req.params;

  const query = `
    SELECT p.id, p.product_name, p.product_code, p.barcode, p.category, p.unit, p.selling_price, p.cost_of_product, p.product_initial_qty,
           c.category, u.unit
           
    FROM products p
    LEFT JOIN categories c ON p.category = c.id
    LEFT JOIN units u ON p.unit = u.id
    WHERE p.id = ?
  `;
  
  database.query(query,[id], (err, rows) => {
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

 
}



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

// Delete product
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM products WHERE id = ?';
  
  database.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  });
};
