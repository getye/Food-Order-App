import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, Snackbar } from '@mui/material';
import RoleTable from './RoleTable';
import PermissionsForm from './PermissionsForm';
import Axios from 'axios';

export const AddRoles = () => {
  const [open, setOpen] = useState(false);
  const [roleData, setRoleData] = useState({ roleName: '', permissions: {} });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoleData({ ...roleData, [name]: value });
  };

const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setRoleData((prevData) => ({
      ...prevData,
      permissions: { ...prevData.permissions, [name]: checked },
    }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('http://localhost:8001/admin/add/roles', roleData);
      console.log("Response:", response.data.message);

      if (response.status === 201) {
        setNotificationMessage('Successfully registered');
        setShowNotification(true);
        setRoleData({ roleName: '', permissions: {} }); // Reset form
      } else {
        setNotificationMessage('Error in registration');
        setShowNotification(true);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        setNotificationMessage(errorMessage);
        setShowNotification(true);
      } else {
        setNotificationMessage('An unexpected error occurred');
        setShowNotification(true);
        console.error(err);
      }
    }
  };

  return (
    <Box sx={{ paddingTop: 2, marginLeft: 32, justifyContent: 'center' }}>
      <RoleTable handleOpen={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            name='roleName'
            type="text"
            fullWidth
            value={roleData.roleName}
            onChange={handleInputChange}
          />
          <PermissionsForm permissions={roleData.permissions} onPermissionChange={handlePermissionChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ bgcolor: 'red', color: 'white', textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{ bgcolor: '#FF8C00', color: 'white', textTransform: 'none' }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showNotification}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        >
        <Alert
            onClose={() => setShowNotification(false)}
            severity={String(notificationMessage).includes('Successfully registered') ? 'success' : 'error'}
            sx={{ width: '100%' }}
        >
            {notificationMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};
