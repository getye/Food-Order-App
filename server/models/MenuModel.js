const pool = require('../dbcon');

const addMenu = async (id, menuName, toppings, price, picture, restaurantName) => {
  const query = 'INSERT INTO menus(menu_id, menu_name, topping, price, photo, restaurant) VALUES($1,$2,$3,$4,$5,$6)';
  const values = [ id, menuName, toppings, price, picture, restaurantName];
  return await pool.query(query, values);
};

const viewMenus = async () => {
  const query = 'SELECT * FROM menus';
  return await pool.query(query);
}; 

const orderPizza = async (id, customer_id, menuName, toppings, price, quantity, restaurant, order_status, formattedDate) => {
  const query = 'INSERT INTO orders(order_id, customer_id, menu_name, topping, price, quantity, restaurant, order_status, created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';
  const values = [ id, customer_id, menuName, toppings, price, quantity, restaurant, order_status, formattedDate];
  return await pool.query(query, values);
};

const viewOrders = async (customer_id) => {
  const query = 'SELECT * FROM orders WHERE customer_id = $1';
  const Value = [customer_id];
  return await pool.query(query, Value);
}; 

const managerViewOrders = async (restaurant) => {
  const query = 'SELECT * FROM orders WHERE restaurant = $1';
  const Value = [restaurant];
  return await pool.query(query, Value);
}; 

const managerViewOrdersWithCustomers = async (restaurant) => {
  const query = `
    SELECT 
      o.order_id,
      o.customer_id,
      o.menu_name,
      o.topping,
      o.price,
      o.quantity,
      o.restaurant,
      o.order_status,
      o.created_at,
      c.customer_email,
      c.customer_location,
      c.customer_phone
    FROM 
      orders o
    JOIN 
      customers c ON o.customer_id = c.customer_id
    WHERE 
      o.restaurant = $1;  
  `;
  const values = [restaurant];
  return await pool.query(query, values);
};

const updateOrderStatus = async (order_id, order_status) => {
  try{
  const result = await pool.query(
          'UPDATE orders SET order_status = $2 WHERE order_id = $1 RETURNING *',
          [order_id, order_status]
      );
      return result;
  }catch(err){
      return err;
  }
};

const managerViewMenus = async (restaurant) => {

  const query = 'SELECT * FROM menus WHERE restaurant = $1';
  const Value = [restaurant];
  return await pool.query(query, Value);
};

const reports = async (restaurant) => {
  const query = `
    SELECT 
      TO_CHAR(TO_TIMESTAMP(created_at, 'HH24:MI MM/DD/YYYY'), 'YYYY-MM') AS month, 
      COUNT(order_id) AS total_orders, 
      SUM(price::numeric * quantity) AS total_earnings 
    FROM orders 
    WHERE restaurant = $1 
    GROUP BY month 
    ORDER BY month;
  `;
  const values = [restaurant];
  return await pool.query(query, values);
};




module.exports = { 
    addMenu,
    viewMenus,
    orderPizza,
    viewOrders,
    managerViewOrders,
    managerViewOrdersWithCustomers,
    updateOrderStatus,
    managerViewMenus,
    reports,
};