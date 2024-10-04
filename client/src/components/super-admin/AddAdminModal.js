import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { z } from 'zod';

// Zod schema for validation
const userSchema = z.object({
  userName: z.string().min(1, "User Name is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Phone number should only contain digits and can start with +"),
    restaurant: z.string().min(1, "Restaurant name is required"),
});

export const AddAdminModal = ({ open, handleClose, newUser, handleInputChange, handleSubmit }) => {
  const [errors, setErrors] = useState({});



  // Validation handler
  const validateForm = () => {
    try {
      userSchema.parse(newUser); // Zod will throw an error if validation fails
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Map Zod errors to form errors
        const formErrors = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
      return false;
    }
  };

  // Submit handler
  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSubmit(); 
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Admin</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="userName"
          label="Admin Name"
          type="text"
          size='small'
          fullWidth
          value={newUser.userName}
          onChange={handleInputChange}
          error={!!errors.userName}
          helperText={errors.userName}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          size='small'
          fullWidth
          value={newUser.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone Number"
          type="text" 
          size='small'
          fullWidth
          value={newUser.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          margin="dense"
          name="restaurant"
          label="Restaurant Name"
          type="text"
          size='small'
          fullWidth
          value={newUser.restaurant}
          onChange={handleInputChange}
          error={!!errors.restaurant}
          helperText={errors.restaurant}
        />

        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          size='small'
          fullWidth
          value={newUser.location}
          onChange={handleInputChange}
          error={!!errors.location}
          helperText={errors.location}
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
          onClick={handleFormSubmit}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
