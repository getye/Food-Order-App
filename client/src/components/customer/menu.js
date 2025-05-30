import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Snackbar } from "@mui/material";

export const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null); 
  const [open, setOpen] = useState(false); 
  const [quantity, setQuantity] = useState(1); 

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:8001/customer/view/menus'); 
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  // Function to handle opening the modal with the selected menu
  const handleOpen = (menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) =>{
    const value = event.target.value;
    setQuantity(value > 0 ? value : 1); 
  }

  const handleSubmit = () => {
    if (selectedMenu && quantity > 0) {
      const orderDetails = {
        menu_name: selectedMenu.menu_name,
        toppings: Array.isArray(selectedMenu.topping)
          ? selectedMenu.topping
          : typeof selectedMenu.topping === 'string'
          ? JSON.parse(selectedMenu.topping)
          : [],
        price: selectedMenu.price,
        quantity: quantity,
        restaurant: selectedMenu.restaurant,
      };

      console.log('Order Details:', orderDetails);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please log in');
        return;
      }
      fetch('http://localhost:8001/customer/order/pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(orderDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessageType("Success");
          setNotificationMessage('Your Order is Successfully Submited');
          setShowNotification(true);
          setOpen(false); // Close the modal after submission
        })
        .catch((error) => {
          setMessageType("Error");
          setNotificationMessage('Error in adding Menu');
          setShowNotification(true);
          console.error('Error submitting order:', error);
        });
    }
  };

  return (
    <Box sx={{ paddingTop: 5, marginBottom: 6, paddingLeft: 32 }}>
      <Grid container spacing={3}> 
        {menus.map((menu) => (
          <Grid item xs={12} sm={4} key={menu.menu_id}> 
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, borderRadius: '50%', marginTop: 2 }} // Make image circular and position it at the top
                image={`http://localhost:8001/uploads/pizza/${menu.photo}`} // Image from the uploads/pizza directory
                alt={menu.menu_name}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>{menu.menu_name}</Typography>
                <Typography variant="body2">
                  {Array.isArray(menu.topping) ? menu.topping.join(', ') : (typeof menu.topping === 'string' ? JSON.parse(menu.topping).join(', ') : '')}
                </Typography>
                <Typography variant="h5" sx={{ color: '#32CD32', fontWeight: 'bold', display: 'inline' }}>
                  {menu.price}
                </Typography>
                <Typography sx={{ display: 'inline', color: 'inherit' }}>
                  <sup>Birr</sup>
                </Typography>
                <Button
                  id = "order"
                  onClick={() => handleOpen(menu)} // Open modal on button click
                  sx={{ bgcolor: '#FF8C00', color: 'white', fontWeight: 'bold', marginLeft: 1, pl: 2, pr: 2, borderRadius: 2, textTransform: 'none' }}
                >
                  Order
                </Button>

                <Divider sx={{ mt: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{menu.restaurant}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Modal for displaying menu details */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle variant="h5" sx={{fontWeight: 'bold', color: '#FF8C00'}}>{selectedMenu?.menu_name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Column for Image */}
              <Grid item xs={12} sm={4}> 
                <CardMedia
                  component="img"
                  sx={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', marginBottom: 2 }}
                  image={`http://localhost:8001/uploads/pizza/${selectedMenu?.photo}`}
                  alt={selectedMenu?.menu_name}
                />
              </Grid>

              {/* Column for Toppings, Price, and Restaurant */}
              <Grid item xs={12} sm={8}> 
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF8C00' }}>Toppings</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  {Array.isArray(selectedMenu?.topping) ? selectedMenu?.topping.join(', ') : 
                    (typeof selectedMenu?.topping === 'string' ? JSON.parse(selectedMenu?.topping).join(', ') : '')}
                </Typography>
                <Box sx={{ display: 'block' }}> 
                  <Typography variant="h6" sx={{ color: '#FF8C00', fontWeight: 'bold', display: 'inline' }}>
                    Price: 
                  </Typography>
                  <Typography variant="h6" sx={{ ml: 1, display: 'inline', color: '#32CD32', fontWeight: 'bold' }}>
                    {selectedMenu?.price}
                  </Typography>
                  <Typography sx={{ display: 'inline', color: 'inherit', ml: 0.3 }}>
                    <sup>Birr</sup>
                  </Typography>
                </Box>

                <Box sx={{ display: 'block', mt: 1 }}> 
                  <Typography variant="h6" sx={{ color: '#FF8C00', fontWeight: 'bold', display: 'inline' }}>
                    Restaurant: 
                  </Typography>
                  <Typography variant="h6" sx={{ display: 'inline', color: '#32CD32', ml: 1 }}>
                    {selectedMenu?.restaurant}
                  </Typography>
                </Box>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Quantity"
                  name='quantity'
                  type="number"
                  size='small'
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
          <Button onClick={handleClose} sx={{ bgcolor: 'red', color: 'white', textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{ bgcolor: '#FF8C00', color: 'white', fontWeight: 'bold', textTransform: 'none' }}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Grid>

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
    </Box>
  );
};
