// UserTable.js
import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateRoleModal from './UpdateRoleModal';

const RoleTable = ({ handleOpen }) => {
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); 

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] =useState('')

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:8001/admin/roles');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Data is not an array');
      setRole(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleUpdate = (role) => {
    setSelectedRole(role); // Set the selected role
    setOpenModal(true); // Open the modal
  };

const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

const handleSubmitUpdate = async (updatedRole) => {
    try {
      const response = await fetch(`http://localhost:8001/admin/update/role/${updatedRole.role_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_name: updatedRole.role_name,
          permissions: updatedRole.permissions, // Send permissions as a JSON string if necessary
        }),
      });
  
      // Check if the update was successful
      if (response.ok) {
        // Update the local state after successful update
        setRole((prevRoles) =>
          prevRoles.map((role) =>
            role.role_id === updatedRole.role_id ? updatedRole : role
          )
        );
        setMessageType('Success');
        setOpenModal(false); // Close the modal
        setNotificationMessage('Role Successfully Updated');
        setShowNotification(true);
      } else {
        // Handle error response
        const errorData = await response.json();
        setMessageType('Error');
        setNotificationMessage(`Error: ${errorData.message}`);
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMessage('An unexpected error occurred');
      setShowNotification(true);
      console.error(err);
    }
  };
  

const handleDelete = async (role) => {
    if (!window.confirm(`Are you sure you want to delete the role: ${role.role_name}?`)) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8001/admin/delete/role/${role.role_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the deleted role from the local state
        setMessageType('Success');
        setRole((prevRoles) => prevRoles.filter((r) => r.role_id !== role.role_id));
        setNotificationMessage('Role Deleted Successfully');
        setShowNotification(true);
      } else {
        // Handle error response
        const errorData = await response.json();
        setMessageType('Error');
        setNotificationMessage(`Error: ${errorData.message}`);
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMessage('An unexpected error occurred while deleting the role');
      setShowNotification(true);
      console.error(err);
    }
  };
  

const handleStatusChange = async (role) => {
    // Toggle the status: "Active" <-> "Inactive"
    const newStatus = role.role_status === 'Active' ? 'Inactive' : 'Active';
  
    try {
      const response = await fetch(`http://localhost:8001/admin/update/role/status/${role.role_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role_status: newStatus }),
      });
  
      if (response.ok) {
        // Update the local state after successful status change
        setRole((prevRoles) =>
          prevRoles.map((r) =>
            r.role_id === role.role_id ? { ...r, role_status: newStatus } : r
          )
        );
        setMessageType('Success')
        setNotificationMessage('Role Status Updated Successfully');
        setShowNotification(true);
      } else {
        // Handle error response
        const errorData = await response.json();
        setMessageType('Error');
        setNotificationMessage(`Error: ${errorData.message}`);
        setShowNotification(true);
      }
    } catch (err) {
      setNotificationMessage('An unexpected error occurred while updating role status');
      setShowNotification(true);
      console.error(err);
    }
  };
  

  const columns = [
    { accessorKey: 'role_name', header: 'Role Name' },
    { accessorKey: 'created_at', header: 'Created at' },
    {
      header: 'Action',
      Cell: ({ row }) => (
        <Box>
          {row.original.role_status === "Active" ? (
            <Tooltip title="Block Role">
              <IconButton
                onClick={() => handleStatusChange(row.original)}
                sx={{ width: '80px', height: '20px', borderRadius: '20px', color: 'green', bgcolor: '#B4CFEC', fontSize: '12px', paddingLeft: 2, paddingRight: 2 }}
              >
                {row.original.role_status}
                <ToggleOnIcon sx={{ color: 'green' }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Unblock Role">
              <IconButton
                onClick={() => handleStatusChange(row.original)}
                sx={{ width: '80px', height: '20px', borderRadius: '20px', color: 'red', bgcolor: '#FAEBD7', fontSize: '12px', paddingLeft: 2, paddingRight: 2 }}
              >
                {row.original.role_status}
                <ToggleOffIcon sx={{ color: 'red' }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Update Role">
            <IconButton onClick={() => handleUpdate(row.original)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Role">
            <IconButton onClick={() => handleDelete(row.original)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <MaterialReactTable
        columns={columns}
        data={role}
        enablePagination
        enableSorting
        enableColumnFiltering
        initialState={{ pagination: { pageSize: 3 } }}
        enableTopToolbar
        renderTopToolbarCustomActions={() => (
          <Button onClick={handleOpen} sx={{ bgcolor: '#FF8C00', color: 'white', textTransform: 'none' }}>
            Add Role
          </Button>
        )}
      />
      {selectedRole && (
        <UpdateRoleModal
          open={openModal}
          role={selectedRole}
          onClose={handleModalClose}
          onSubmit={handleSubmitUpdate}
        />
      )}

    <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        >
        <Alert
            onClose={() => setShowNotification(false)}
            severity={String(messageType).includes('Success') ? 'success' : 'error'}
            sx={{ width: '100%' }}
        >
            {notificationMessage}
        </Alert>
    </Snackbar>
    </Box>
  );
};

export default RoleTable;



