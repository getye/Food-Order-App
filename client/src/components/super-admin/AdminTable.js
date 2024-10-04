import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { AdminActions } from './AdminAction';

export const AdminTable = ({ handleOpen }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8001/superadmin/view/admins');
      const data = await response.json();

      if (!Array.isArray(data)) throw new Error('Data is not an array');

      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleNotification = (message, type) => {
    setNotificationMessage(message);
    setMessageType(type);
    setShowNotification(true);
  };

  const columns = React.useMemo(
    () => [
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'user_email', header: 'Email' },
      { accessorKey: 'user_restaurant', header: 'Restaurant' },
      {
        header: 'Action',
        Cell: ({ row }) => 
              <AdminActions 
                     user={row.original} 
                      onNotify={handleNotification} 
                  />,
      },
    ],
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <>
    {users.length > 0 ? (
      <Box sx={{ padding: 3 }}>
        <MaterialReactTable
          columns={columns}
          data={users}
          enablePagination
          enableSorting
          enableColumnFiltering
          initialState={{ pagination: { pageSize: 3 } }}
          renderTopToolbarCustomActions={() => (
            <Button
              onClick={handleOpen}
              sx={{
                bgcolor: '#FF8C00',
                paddingLeft: 3,
                paddingRight: 3,
                borderRadius: 1,
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#FF6700',
                  opacity: 0.9,
                },
              }}
            >
              Add Admin
            </Button>
          )}
        />
      </Box>
    ) : (
      <div>No records found</div>
    )}
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
            severity={String(messageType).includes('Success') ? 'success' : 'error'}
            sx={{ width: '100%' }}
        >
            {notificationMessage}
        </Alert>
      </Snackbar>
    </>
    
  );
};
