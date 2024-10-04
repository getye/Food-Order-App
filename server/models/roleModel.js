const pool = require('../dbcon');

const addRole = async ( id, roleName, permissions, created_at, role_status) => {
  const query = 'INSERT INTO roles(role_id, role_name, permissions, created_at, role_status) VALUES($1,$2,$3,$4,$5)';
  const values = [ id, roleName, permissions, created_at, role_status];
  return await pool.query(query, values);
};

const viewRoles = async () => {
    const query = 'SELECT * FROM roles';
    return await pool.query(query);
  }; 

const updateRole = async (role_id, role_name, permissions) => {
    try{
    const result = await pool.query(
            'UPDATE roles SET role_name = $2, permissions = $3 WHERE role_id = $1 RETURNING *',
            [role_id, role_name, permissions]
        );
        return result;
    }catch(err){
        return err;
    }
};

const deleteRole = async (role_id) => {
  
    try{
    const result = await pool.query(
            'DELETE FROM roles WHERE role_id = $1 RETURNING *',
            [role_id]
        );
        return result;
    }catch(err){
        return err;
    }
};

const updateRoleStatus = async (role_id, role_status) => {
    try{
    const result = await pool.query(
            'UPDATE roles SET role_status = $2 WHERE role_id = $1 RETURNING *',
            [role_id, role_status]
        );
        return result;
    }catch(err){
        return err;
    }
};


module.exports = {
  addRole,
  viewRoles,
  updateRole,
  deleteRole,
  updateRoleStatus,
};
