import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormGroup, FormControlLabel, Checkbox, Grid } from '@mui/material';

const UpdateRoleModal = ({ open, role, onClose, onSubmit }) => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({ 
        addUsers: false, 
        createRoles: false,
        updateOrderStatus: false,
        seeOrders: false,
        seeCustomers: false,});

  useEffect(() => {
    if (role) {
      setRoleName(role.role_name);
      setPermissions(JSON.parse(role.permissions || '{}')); // Initialize permissions if provided
    }
  }, [role]);

  const handlePermissionChange = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };

  const handleSubmit = () => {
    const updatedRole = {
      ...role,
      role_name: roleName,
      permissions: JSON.stringify(permissions),
    };
    onSubmit(updatedRole);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>Update Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          fullWidth
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          margin="normal"
        />
        <FormGroup>
            <Grid container spacing={5}>
             <Grid item xs={6}>
                <FormControlLabel
                    control={<Checkbox checked={permissions.addUsers} onChange={handlePermissionChange} name="addUsers" />}
                    label="Add Users"
                    />
                <FormControlLabel
                    control={<Checkbox checked={permissions.createRoles} onChange={handlePermissionChange} name="createRoles" />}
                    label="Create Roles"
                    />
                <FormControlLabel
                    control={<Checkbox checked={permissions.updateOrderStatus} onChange={handlePermissionChange} name="updateOrderStatus" />}
                    label="Update Order Status"
                    />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    control={<Checkbox checked={permissions.seeOrders} onChange={handlePermissionChange} name="seeOrders" />}
                    label="See Orders"
                    />
                <FormControlLabel
                    control={<Checkbox checked={permissions.seeCustomers} onChange={handlePermissionChange} name="seeCustomers" />}
                    label="See Customers"
                    />
            </Grid>
            </Grid>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ bgcolor: 'red', color: 'white', textTransform: 'none' }}>Cancel</Button>
        <Button onClick={handleSubmit} sx={{ bgcolor: '#FF8C00', color: 'white', textTransform: 'none' }}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateRoleModal;
