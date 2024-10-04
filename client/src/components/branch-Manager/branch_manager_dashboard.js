import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";

export const BranchManagerDashboard = () => {
  const [menus, setMenus] = useState([]);

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchMenus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
              console.log('No token found, please log in');
              return;
            }
          
            const response = await fetch('http://localhost:8001/manager/view/menus', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add the token to the Authorization header
              }
            });
          
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          
            const data = await response.json();
            setMenus(data);
          } catch (error) {
            console.error('Error fetching menus:', error);
          }
          
    };

    fetchMenus();
  }, []);

  return (
    <Box sx={{ paddingTop: 5, marginBottom:6, paddingLeft: 32, mr:3 }}>
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
              <CardContent sx={{ textAlign: 'center' }}> {/* Center align text */}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
