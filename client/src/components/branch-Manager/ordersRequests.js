import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

export const OrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Modal open/close state
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order

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
      { accessorKey: 'customer_phone', header: 'Phone' },
      { accessorKey: 'menu_name', header: 'Name' },
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
                  <strong>Topping:</strong> {formatToppings(selectedOrder.topping)}
                </Typography>
                <Typography variant="body1">
                  <strong>Unit Price:</strong> {selectedOrder.price} Birr
                </Typography>
                <Typography variant="body1">
                  <strong>Total Price:</strong> {selectedOrder.quantity*selectedOrder.price} Birr
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedOrder.customer_email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedOrder.customer_phone}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      ) : (
        <div>No records found</div>
      )}
    </Box>
  );
};