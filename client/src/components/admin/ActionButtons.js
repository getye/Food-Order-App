import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionButtons = ({ user, onNotify }) => {
  const [userStatus, setUserStatus] = useState(user.user_status);
  
const handleStatusChange = async () => {
    const newStatus = userStatus === 'Active' ? 'Inactive' : 'Active';
    setUserStatus(newStatus);

    try {
      const response = await fetch(`http://localhost:8001/admin/update/user/status/${user.user_email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_status: newStatus }),
      });

      if (response.ok) {
        onNotify('User Status Updated Successfully', 'Success');
      } else {
        const errorData = await response.json();
        onNotify(`Error: ${errorData.message}`, 'Error');
      }
    } catch (err) {
      onNotify('Error occurred while updating user status', 'Error');
      console.error(err);
    }
  };


const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete : ${user.user_name}?`)) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8001/admin/delete/user/${user.user_email}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        onNotify('User Deleted Successfully', 'Success');
      } else {
        const errorData = await response.json();
        onNotify(`Error: ${errorData.message}`, 'Error');
      }
    } catch (err) {
      onNotify('Error occurred while deleting user', 'Error');
      console.error(err);
    }
  };

  return (
    <Box>
      {userStatus === 'Active' ? (
        <Tooltip title="Block User">
          <IconButton
            onClick={handleStatusChange}
            sx={{ width: '80px', height: '20px', borderRadius: '20px', color: 'green', bgcolor: '#B4CFEC', fontSize: '12px', paddingLeft: 2, paddingRight: 2 }}
          >
            {userStatus}
            <ToggleOnIcon sx={{ color: 'green' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Unblock User">
          <IconButton
            onClick={handleStatusChange}
            sx={{ width: '80px', height: '20px', borderRadius: '20px', color: 'red', bgcolor: '#FAEBD7', fontSize: '12px', paddingLeft: 2, paddingRight: 2 }}
          >
            {userStatus}
            <ToggleOffIcon sx={{ color: 'red' }} />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Delete User">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActionButtons;
