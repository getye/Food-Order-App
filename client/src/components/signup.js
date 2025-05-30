import React, { useState } from 'react';
import { z } from 'zod';
import Axios from 'axios';
import {
  Grid, Box, Typography, TextField, Button, Snackbar, Alert,
  FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,
  Link,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import sideFrame from '../assets/sideFrame.png';
import pizza from '../assets/pizza.png';


const signupSchema = z.object({
  email: z.string().email('Invalid email address').min(5, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
  location: z.string().min(1, 'Location is required'),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Phone number should only contain digits and can start with +"),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export const Signup = () => {
  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
  };
  
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirm = (event) => event.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear error if the field is now valid
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit button clicked');
    console.log('Form Values:', formValues);

    try {
      // Validate the form values with Zod
      signupSchema.parse(formValues);
      console.log('Validation passed');
      // If validation passes, proceed with the signup
      const response = await Axios.post('http://localhost:8001/customer/signup', formValues);
      console.log("Response:", response.data.message);
      
      if (response.status === 201) {
        setNotificationMessage('Successfully registered');
        setShowNotification(true);
        setFormValues(initialFormValues); // Clear the form
      } else {
        setNotificationMessage('Error in signup');
        setShowNotification(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log('Validation errors:', err.errors);
        const formattedErrors = err.flatten().fieldErrors;
        setErrors(formattedErrors);
      } else if (err.response) {
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
    <Box component={'form'} onSubmit={handleSubmit}>
      <Grid container sx={{ paddingTop: 4, paddingBottom:8, width: '80%', paddingLeft: 35 }}>
        <Grid item xs={6} sx={{ height: '72vh', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <img src={sideFrame} alt='Pizza' width={'90%'} />
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: 0 }}>
          <Box sx={{ paddingLeft: 0, width: '80%' }}>
            <img src={pizza} alt='Pizza' />
            <TextField
              id = 'email'
              size ="small"
              sx = {{ paddingBottom: 1 }}
              type= "email"
              name = "email"
              value = {formValues.email}
              onChange={handleChange}
              label="Email"
              
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.[0]}
            />
            <FormControl size='small' sx={{ paddingBottom: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                
                fullWidth
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={Boolean(errors.password)}
              />
              {errors.password && <Typography color="error">{errors.password?.[0]}</Typography>}
            </FormControl>
            <FormControl size='small' sx={{ width: '100%', paddingBottom: 1 }} variant="outlined">
              <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                autoComplete='off'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownConfirm}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                error={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && <Typography color="error">{errors.confirmPassword?.[0]}</Typography>}
            </FormControl>
            <TextField
              size="small"
              id = 'phone'
              sx={{ paddingBottom: 1 }}
              type="text"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              label="Phone Number"
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors.phone?.[0]}
            />
            <TextField
              size="small"
              id = 'location'
              sx={{ paddingBottom: 1 }}
              type="text"
              name="location"
              value={formValues.location}
              label="Location"
              fullWidth
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location?.[0]}
            />
            <FormControlLabel
              control={<Checkbox id="terms" value="accept" color="primary" />}
              label="I accept terms and conditions" required
              fullWidth
            />
            <Button 
              type="submit" 
              id='sign-up'
              fullWidth size='small' 
              sx={{
                bgcolor:'#FF8C00', 
                paddingLeft:3,
                paddingRight:3,
                borderRadius:1,
                color:'white',
                textTransform: 'none',
                '&:hover': {
                        bgcolor: '#FF6700',
                        opacity: 0.9,
                      },}}>
                Sign up
            </Button>
            <Typography component="h5">
              Have an account? <Link href="/signin">Sign in</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

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
          severity={notificationMessage.includes('Successfully registered') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};