import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Snackbar, Typography, IconButton, FormLabel } from '@mui/material';
import { Topping } from './Topping'; // Ensure your Topping component passes the correct name
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export const AddMenu = () => {
  const [menuData, setMenuData] = useState({ menuName: '', toppings: [], price: '', picture: null });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMenuData({
        ...menuData,
        picture: file,
      });
    }
  };

  const handleToppingChange = (event) => {
    const { name, checked } = event.target;

    setMenuData((prevMenuData) => {
      const newToppings = checked
          ? [...prevMenuData.toppings, name] // Add topping name if checked
          : prevMenuData.toppings.filter(topping => topping !== name); // Remove topping name if unchecked

      return {
        ...prevMenuData,
        toppings: newToppings, // Store as an array of names
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('menuName', menuData.menuName);
    formData.append('toppings', JSON.stringify(menuData.toppings)); // This now sends an array
    formData.append('price', menuData.price);
    formData.append('picture', menuData.picture);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please log in');
        return;
      }
      const response = await fetch('http://localhost:8001/kitchen-manager/add/menu', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });
      if (response.ok) {
        setMessageType("Success");
        setNotificationMessage('Menu Successfully Added');
        setShowNotification(true);
        setMenuData({ menuName: '', toppings: [], price: '', picture: null }); // Reset form
      } else {
        setMessageType("Error");
        setNotificationMessage('Error in adding Menu');
        setShowNotification(true);
      }
    } catch (err) {
      console.error(err);
      setMessageType("Error");
      setNotificationMessage('An unexpected error occurred');
      setShowNotification(true);
    }
  };

  return (
    <Box
      sx={{
        paddingTop: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '40%',
        bgcolor:'#F8F8FF'
      }}
    >
      <Box sx={{bgcolor:'#F8F8FF', maxWidth:'80%', justifyContent: 'center',
        alignItems: 'center',}}>
      <Typography variant='h5'>Add Menu</Typography>
      <Box>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name='menuName'
          type="text"
          size='small'
          fullWidth
          value={menuData.menuName}
          onChange={handleInputChange}
        />
        <Topping toppings={menuData.toppings} onToppingChange={handleToppingChange} />
        <TextField
          autoFocus
          margin="dense"
          label="Price"
          name='price'
          type="number"
          size='small'
          fullWidth
          value={menuData.price}
          onChange={handleInputChange}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            accept="image/*"
            id="picture"
            name="picture"
            type="file"
            onChange={handlePictureUpload}
            style={{ display: 'none' }}
          />
          <Box
            sx={{
              border: 1,
              width: '50%',
              borderColor: 'gray',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
              marginTop: 1,
            }}
          >
            <FormLabel htmlFor="picture">
              <IconButton
                component="span"
                sx={{
                  color: '#FF8C00',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <FileDownloadOutlinedIcon />
                {menuData.picture ? menuData.picture.name : ' Upload Pizza Photo'}
              </IconButton>
            </FormLabel>
          </Box>
        </Box>
      </Box>
      <Button onClick={handleSubmit} 
          sx={{ 
            bgcolor: '#FF8C00',
            color: 'white',
            width: '100%',
            textTransform: 'none',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 2,    
            alignSelf: 'center', 
            fontWeight:'bold',
            fontSize:'16px'           
            }}>Submit</Button>
      
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
    </Box>
  );
};
