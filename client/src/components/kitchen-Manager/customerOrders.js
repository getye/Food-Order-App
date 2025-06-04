import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Autocomplete, TextField, Alert, Snackbar } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

export const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Modal open/close state
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order


  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] =useState('')


  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        console.log('No token found, please log in');
        return;
      }

      const response = await fetch('http://localhost:8001/manager/view/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log("Response: ", data);
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }

      setOrders(data); // Set the orders data to state
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Handle loading state
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = React.useMemo(
    () => [
      { accessorKey: 'menu_name', header: 'Name' },
      { accessorKey: 'quantity', header: 'Quantity' },
      { accessorKey: 'created_at', header: 'Created at' },
      { accessorKey: 'order_status', header: 'Status' },
    ],
    []
  );

  const handleRowClick = (row) => {
    console.log('Row clicked:', row); // Debugging: Ensure row click works
    setSelectedOrder(row.original); // Set selected order data
    setOpenModal(true); // Open modal
  };

  const handleClose = () => {
    setOpenModal(false); // Close modal
    setSelectedOrder(null); // Clear selected order data
  };

  const formatToppings = (topping) => {
    // Check if topping is a valid string
    if (typeof topping === 'string') {
      // Remove surrounding braces and split by comma
      const cleanedToppings = topping.replace(/[{}"]/g, '').split(',');
      return cleanedToppings.map(t => t.trim()).join(', '); // Trim spaces and join
    }
    return topping; // Return as is if not a string
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  const order_status = [
    { label: 'Preparing', value: 'Preparing' },
    { label: 'Ready', value: 'Ready' },
    { label: 'Delivered', value: 'Delivered' },
  ];

  const handleStatusChange = (e, newValue) => {
    setOrderStatus(newValue ? newValue.value : '')
  }
  
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8001/kitchen-managr/update/order/status/${selectedOrder.order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_status: orderStatus,
        }),
      });
  
      // Check if the update was successful
      if (response.ok) {
        // Update the local state after successful update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === selectedOrder.order_id ? selectedOrder : order
          )
        );
        setMessageType('Success');
        setOpenModal(false); // Close the modal
        setNotificationMessage('Order Status Successfully Updated');
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
  }

  return (
    <Box sx={{ pt: 5, ml: 32 }}>
      {orders.length > 0 ? (
        <Box>
          <MaterialReactTable
            columns={columns}
            data={orders}
            enablePagination
            enableSorting
            enableColumnFiltering
            initialState={{ pagination: { pageSize: 3 } }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => handleRowClick(row), // Attach the click event here
              sx: { cursor: 'pointer' }, // Style for pointer cursor
            })}
          />

          {/* Modal for displaying selected order details */}
          {selectedOrder && (
            <Dialog open={openModal} onClose={handleClose}>
              <DialogTitle>Order Details</DialogTitle>
              <DialogContent>
               <Typography variant="body1">
                  <strong>Order No:</strong> {selectedOrder.order_id} 
                </Typography>
                <Typography variant="body1">
                  <strong>Topping:</strong> {formatToppings(selectedOrder.topping)}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {selectedOrder.quantity} 
                </Typography>
                <Typography variant="body1">
                  <strong>Unit Price:</strong> {selectedOrder.price} Birr
                </Typography>
                <Typography variant="body1">
                  <strong>Total Price:</strong> {selectedOrder.quantity*selectedOrder.price} Birr
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedOrder.order_status} 
                </Typography>
                <Typography variant='h6' sx={{mt:3}}>
                  Update Status
                </Typography>
                <Autocomplete
                    disablePortal
                    id="status"
                    size='small'
                    required
                    options={order_status}
                    sx={{ width: 300, paddingBottom:2, mt:1 }}
                    renderInput={(params) => <TextField {...params} label="Select Status" />}
                    onChange={handleStatusChange}
                    getOptionLabel={(option) => option.label}

                  />
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={{
                      bgcolor: 'red',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'red',
                        opacity: 0.9,
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="update"
                    onClick={handleStatusUpdate}
                    sx={{
                      bgcolor: '#FF8C00',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#FF6700',
                        opacity: 0.9,
                      },
                    }}
                  >
                    Update
                  </Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      ) : (
        <div>No records found</div>
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