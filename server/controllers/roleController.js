const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const roleModel = require('../models/roleModel');
const { generateTokens } = require('../utils/jwt.helper'); 

const addRole = async (req, res) => {
  const id = uuidv4();
  const { roleName, permissions } = req.body;
  const role_status = "Active"

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const created_at = `${month}/${day}/${year}`;

  try {
    await roleModel.addRole(id, roleName, permissions, created_at, role_status);
    res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error, not registered" });
  }
}; 


const viewRoles = async (req, res) => {
    try {
      const users = await roleModel.viewRoles();
      res.json(users.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving users" });
    }
  };

const updateRole = async (req, res) => {
    const { role_id } = req.params; // Get role_id from URL params
    const { role_name, permissions } = req.body; // Extract role_name and permissions from request body
  
    try {
      await roleModel.updateRole(role_id, role_name, permissions);
  
      res.status(201).json({ message: 'Role updated successfully' });
      
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const deleteRole = async (req, res) => {
    const { role_id } = req.params; // Get role_id from URL params
  
    try {
      await roleModel.deleteRole(role_id);
  
     res.status(201).json({ message: 'Role deleted successfully' });
      
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const updateRoleStatus = async (req, res) => {
    const { role_id } = req.params; // Get role_id from URL params
    const { role_status } = req.body; // Extract role_status from request body
  
    try {
      await roleModel.updateRoleStatus(role_id, role_status);
  
      res.status(201).json({ message: 'Role Status updated successfully' });
      
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  





module.exports = {
  addRole,
  viewRoles,
  updateRole,
  deleteRole,
  updateRoleStatus,
};
