import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Grid, Typography } from '@mui/material';

const PermissionsForm = ({ permissions, onPermissionChange }) => {
  return (
    <FormGroup>
      <Typography variant="h6">Permissions</Typography>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox checked={permissions["updateOrderStatus"] || false} name="updateOrderStatus" onChange={onPermissionChange} />}
            label="Update Order Status"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions["seeOrders"] || false} name="seeOrders" onChange={onPermissionChange} />}
            label="See Orders"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions["addUsers"] || false} name="addUsers" onChange={onPermissionChange} />}
            label="Add Users"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox checked={permissions["seeCustomers"] || false} name="seeCustomers" onChange={onPermissionChange} />}
            label="See Customers"
          />
          <FormControlLabel
            control={<Checkbox checked={permissions["createRoles"] || false} name="createRoles" onChange={onPermissionChange} />}
            label="Create Roles"
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default PermissionsForm;
