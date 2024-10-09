import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Divider, MenuItem, Link } from '@mui/material';
import { Profile } from './profile';
import pizza from '../assets/pizza.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import topLeft from '../assets/topLeftPizza.png';
import liftIcon from '../assets/packedPizza.jpg';




const drawerWidth = 240;

const Footer = () => (
  <Box 
    sx={{ 
      p: 1, 
      paddingLeft:32,
      textAlign: 'center', 
      backgroundColor: 'black', 
      color:'white',
      position: 'fixed', 
      zIndex: 1000,
      bottom: 0, 
      left: 0, 
      right: 0 
    }}
  >
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Pizza. All rights reserved.
        </Typography>
        <Link 
          href="/terms" 
          sx={{ 
            mx: 1, 
            color: 'white',  
            textDecoration: 'none',  
            fontWeight: 'bold',  
            '&:hover': {
              textDecoration: 'none',  
              color: 'secondary.main',  
            },
          }}>
          Terms and Conditions
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </Link>
        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </Link>
        <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon />
        </Link>
      </Box>
    </Stack>
  </Box>
);

export const MainBar = (props) => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const { window } = props;


  const handleSignOut = () => {
    localStorage.clear();
    navigate('/')
  };
  const drawer = (
    <List sx={{ height: "100%", borderColor: 'gray' }}>
      <Stack justifyContent={'space-between'} padding={1.5} direction="row" gap={3}>
        <Stack direction="row" gap={2}>
          <Typography variant="h6">Pizza</Typography>
        </Stack>
          <MenuOpenIcon />
        
      </Stack>
      <Divider />
      <img src={topLeft} alt='Pizza' width={'100%'} />
      
      {/* Super Admin Links */}
      {userRole === "Super Admin" && (
          <>
          <ListItem disablePadding onClick={() => { navigate("superadmin/view/admins") }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
              </ListItemButton>
            </ListItem>

          </>
        )}

      {/* Restaurant Register/Admin Links */}
      {userRole === "Restaurant Register" && (
        <>
        <ListItem disablePadding onClick={() => { navigate("admin/reports") }}>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => { navigate("admin/roles") }}>
            <ListItemButton>
              <ListItemIcon>
                <Person2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Role" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => { navigate("admin/users") }}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
          </ListItem>

        </>
      )}

      {/* Kichen manager Links */}
      {userRole === "Kitchen Manager" && (
        <>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("kichen-manager/dashboard") }}>
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("kichen-manager/add/menu") }}>
            <ListItemButton>
              <ListItemIcon>
                <LocalPizzaOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Menu" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => { navigate("kichen-manager/view/orders") }}>
            <ListItemButton>
              <ListItemIcon>
              <img src={liftIcon} alt='Pizza' width={40} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </>
      )}

      {/* Branch manager Links */}
      {userRole === 'Branch Manager' && (
        <>
          <ListItem disablePadding onClick={() => { navigate("branch-manager/dashboard") }}>
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => { navigate("branch-manager/view/orders") }}>
            <ListItemButton>
              <ListItemIcon>
              <img src={liftIcon} alt='Pizza' width={40} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>

        </>
      )}

            {/* Cashier Links */}
            {userRole === 'Cashier' && (
        <>
          <ListItem disablePadding onClick={() => { navigate("cashier/view/orders") }}>
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </>
      )}

       {/* Customer Links */}
       {userRole === 'Customer' && (
        <>
          <ListItem disablePadding onClick={() => { navigate("customer/view/orders") }}>
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => { navigate("customer/menu") }}>
            <ListItemButton>
              <ListItemIcon>
                <LocalPizzaIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>

        </>
      )}
      <Divider/>
        <ListItem disablePadding onClick={ handleSignOut } sx={{maxWidth:'80%', marginLeft:3, paddingTop:2}}>
            <ListItemButton sx={{marginLeft:2}}>
              <ListItemIcon>
                <LoginOutlinedIcon sx={{color:'red'}}/>
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{color:'red'}}/>
            </ListItemButton>
        </ListItem>
    </List>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '56px' }}>
      <CssBaseline />
      <AppBar position="fixed" gap={2} sx={{ width: 1, backgroundColor: 'white', color: 'black' }}>
        
          
          {(!userRole) ? (
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <img src={pizza} alt='Pizza' />
              <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
              <MenuItem onClick={() => navigate('/contact')}>Who we are</MenuItem>
              <MenuItem
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: '#FF6700',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#FF6700',
                    opacity: 0.9,
                  },
                }}>Register</MenuItem>
              <MenuItem onClick={() => navigate('/signin')}>Sign in</MenuItem>
            </Toolbar>
          ) : (
            
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <Profile />
            </Toolbar>
          )}
        
      </AppBar>
      {userRole && (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer
            container={container}
            variant="temporary"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Footer />
    </Box>
  );
};

MainBar.propTypes = {
  window: PropTypes.func,
};