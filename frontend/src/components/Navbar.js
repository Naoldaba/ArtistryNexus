
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {AccountCircle, Logout} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import logo from '../resources/images/artistryNexusLogo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/auth';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black',
  elevation: 0,
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: 'white',
  '&:hover': {
    color: 'purple',
    backgroundColor: 'transparent',
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: 'white',
  '&:hover': {
    color: 'purple',
    backgroundColor: 'transparent',
  },
}));
const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    backgroundColor: 'black',
    marginTop: '64px',
    width: '20%',
    paddingTop: '10px'

  },
});

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate()
  const {user, token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box>
    <List>
      <ListItemButton
        onClick={() => navigate('/')}
        sx={{
          '&:hover': {
            backgroundColor: 'grey', // Hover background color
          },
        }}
      >
        <ListItemIcon><HomeIcon style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Home" style={{ color: 'white' }} />
      </ListItemButton>
      <Divider style={{ backgroundColor: 'gray' }} />
      <ListItemButton
        onClick={() => navigate('/contact')}
        sx={{
          '&:hover': {
            backgroundColor: 'grey', // Hover background color
          },
        }}
      >
        <ListItemIcon><ContactMailIcon style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Contact Us" style={{ color: 'white' }} />
      </ListItemButton>
      <Divider style={{ backgroundColor: 'gray' }} />
      <ListItemButton
        onClick={() => navigate('/about')}
        sx={{
          '&:hover': {
            backgroundColor: 'grey', // Hover background color
          },
        }}
      >
        <ListItemIcon><InfoIcon style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="About" style={{ color: 'white' }} />
      </ListItemButton>
      <Divider style={{ backgroundColor: 'gray' }} />
      <ListItemButton
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'grey', // Hover background color
          },
        }}
      >
        <ListItemIcon><Logout style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Logout" style={{ color: 'white' }} />
      </ListItemButton>
    </List>
  </Box>
  )

  return (
    <>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ marginRight: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
                width: '50px',
                objectFit: 'cover',
            }}
            alt={"logo"}
            src={logo}
            />
            <Typography variant="h5" sx={{mr: '30px', color:"purple"}}>Artistry Nexus</Typography>
          <StyledButton color="inherit">Shop</StyledButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ flexGrow: 1 }} />
          
          {!token && <StyledButton onClick={() => navigate('/signup')} color="inherit">Sign Up</StyledButton> }
          {!token && <StyledButton onClick={() => navigate('/login')} color="inherit">Login</StyledButton>}
          {token && <StyledTypo color='white' >{user}</StyledTypo> }
          <IconButton
            edge="end"
            color="inherit"
            sx={{ marginLeft: 2 }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default Navbar;
