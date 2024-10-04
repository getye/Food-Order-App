const pool = require('../dbcon');

const createUser = async (id, email, hashedpass, phone, restaurantName, location, user_type, coverPhoto, user_status) => {
  const query = 'INSERT INTO users(user_id, user_email, user_password, user_phone, user_restaurant, user_location, user_type, user_profile, user_status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';
  const values = [id, email, hashedpass, phone, restaurantName, location, user_type, coverPhoto, user_status];
  return await pool.query(query, values);
};


const createCustomer = async (id, email, hashedpass, location, phone) => {
  const query = 'INSERT INTO customers(customer_id, customer_email, customer_password, customer_location, customer_phone) VALUES($1,$2,$3,$4,$5)';
  const values = [id, email, hashedpass, location, phone];
  return await pool.query(query, values);
};

const createAccount = async (id, email, hashedpass, role) => {
  const query = 'INSERT INTO accounts(user_id, user_email, user_password, user_role) VALUES($1,$2,$3,$4)';
  const values = [id, email, hashedpass, role];
  return await pool.query(query, values);
};

const getAllUsers = async (restaurant) => {
  const query = 'SELECT user_name, user_email, user_type, user_status FROM users WHERE user_restaurant = $1';
  const values = [restaurant];
  return await pool.query(query, values);
}; 

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM accounts WHERE user_email = $1';
  const values = [email];
  return await pool.query(query, values);
};

const updateUserStatus = async (user_email, user_status) => {
  const result = await pool.query(
    'UPDATE users SET user_status = $1 WHERE user_email = $2 RETURNING *',
    [user_status, user_email]
  );

  return result.rows.length > 0 ? result.rows[0] : null; // Return the updated user or null if not found
};

const getAdminRestaurant = async (admin_id) => {
  const selectQuery = 'SELECT user_restaurant FROM users WHERE user_id = $1';
  const selectedValues = [admin_id];
  const result = await pool.query(selectQuery, selectedValues);
  console.log("Restaurant: ", result)
  return result.rows.length > 0 ? result.rows[0].user_restaurant : null;
};

const addUser = async (id, userName, email, hashedpass, phone, location, role, user_profile, user_status, restaurantName) => {
  const query = `
    INSERT INTO users(
      user_id, user_email, user_password, user_phone, 
      user_restaurant, user_location, user_type, 
      user_profile, user_status, user_name
    ) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const values = [id, email, hashedpass, phone, restaurantName, location, role, user_profile, user_status, userName];
  return await pool.query(query, values);
};

const updatePassword = async (user_id, password) => {
  const result = await pool.query(
    'UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *',
    [password, user_id]
  );
  return result.rows.length > 0 ? result.rows[0] : null; // Return the updated user or null if not found
};

const deleteUser = async (user_email) => {
  
  try{
  const result = await pool.query(
          'DELETE FROM users WHERE user_email = $1 RETURNING *',
          [user_email]
      );
      return result;
  }catch(err){
      return err;
  }
};

const getAllAdmins = async (role) => {
  
  const selectQuery = 'SELECT user_name, user_email, user_restaurant, user_status FROM users WHERE user_type = $1';
  const selectedValues = [role];
  const result = await pool.query(selectQuery, selectedValues);
  return result;
}; 

const addAdmin = async (id, userName, email, hashedpass, phone, restaurant, role, location, user_profile, user_status) => {
  const query = `
    INSERT INTO users(
      user_id, user_email, user_password, user_phone, 
      user_restaurant, user_location, user_type, 
      user_profile, user_status, user_name
    ) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;
  const values = [ id, email, hashedpass, phone, 
                  restaurant, location, role, 
                  user_profile, user_status, userName];
  return await pool.query(query, values);
};

const updateProfile = async (user_id, picture) => {
  try{
  const result = await pool.query(
          'UPDATE users SET user_profile = $2 WHERE user_id = $1 RETURNING *',
          [user_id, picture]
      );
      return result;
  }catch(err){
      return err;
  }
};


module.exports = {
  createUser,
  createCustomer,
  createAccount,
  findUserByEmail,
  getAllUsers,
  updateUserStatus,
  getAdminRestaurant,
  addUser,
  updatePassword,
  deleteUser,
  getAllAdmins,
  addAdmin,
  updateProfile,
};
