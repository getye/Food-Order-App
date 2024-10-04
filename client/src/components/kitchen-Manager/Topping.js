import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Grid, Typography, TextField, Button, Box } from '@mui/material';

export const Topping = ({ toppings, onToppingChange }) => {
  const [newTopping, setNewTopping] = useState('');

  // List of default toppings that should always be displayed
  const defaultToppings = ["Mozzarella", "Tomato", "Bell Pepper", "Onion", "Olives"];

  const handleAddTopping = () => {
    if (newTopping.trim() !== '') {
      onToppingChange({ target: { name: newTopping, checked: true } });
      setNewTopping(''); // Clear the input after adding
    }
  };

  return (
    <FormGroup>
      <Typography variant="h6">Topping</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Render default toppings */}
          {defaultToppings.map((topping) => (
            <FormControlLabel
              key={topping}
              control={
                <Checkbox
                  checked={toppings.includes(topping)} // Check if the topping is in the array
                  name={topping}
                  onChange={onToppingChange}
                />
              }
              label={topping}
            />
          ))}

          {/* Render dynamically added toppings */}
          {toppings
            .filter((topping) => !defaultToppings.includes(topping)) // Exclude default toppings
            .map((topping) => (
              <FormControlLabel
                key={topping}
                control={
                  <Checkbox
                    checked={true} // Always checked since it's coming from the state
                    name={topping}
                    onChange={onToppingChange}
                  />
                }
                label={topping}
              />
          ))}
        </Grid>

        {/* Add New Topping Section */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="New Topping"
              value={newTopping}
              onChange={(e) => setNewTopping(e.target.value)}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleAddTopping}
              sx={{ bgcolor: '#FF8C00', color: 'white', textTransform: 'none' }}
            >
              + Add
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormGroup>
  );
};
