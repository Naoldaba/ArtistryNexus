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
import { AccountCircle, Logout, Add } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import logo from '../resources/images/artistryNexusLogo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/auth';
import { searchUsers } from '../actions/search';
import { clearSelectedUser } from '../reducers/search';

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
  backgroundColor: '#333333',
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
    paddingTop: '10px',
  },
});

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = () => {
    navigate('/search');
    dispatch(searchUsers(searchQuery));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const drawer = (
    <Box>
      <List>
        <ListItemButton
          onClick={() => navigate('/')}
          sx={{
            '&:hover': {
              backgroundColor: 'grey',
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" style={{ color: 'white' }} />
        </ListItemButton>
        <Divider style={{ backgroundColor: 'gray' }} />
        <ListItemButton
          onClick={() => navigate('/contact')}
          sx={{
            '&:hover': {
              backgroundColor: 'grey',
            },
          }}
        >
          <ListItemIcon>
            <ContactMailIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Contact Us" style={{ color: 'white' }} />
        </ListItemButton>
        <Divider style={{ backgroundColor: 'gray' }} />
        <ListItemButton
          onClick={() => navigate('/about')}
          sx={{
            '&:hover': {
              backgroundColor: 'grey',
            },
          }}
        >
          <ListItemIcon>
            <InfoIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="About" style={{ color: 'white' }} />
        </ListItemButton>
        <Divider style={{ backgroundColor: 'gray' }} />
        {token && (
          <ListItemButton
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'grey',
              },
            }}
          >
            <ListItemIcon>
              <Logout style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" style={{ color: 'white' }} />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

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
            alt="logo"
            src={logo}
          />
          <Typography
            variant="h5"
            sx={{
              mr: '30px',
              background: 'linear-gradient(to bottom, purple, white)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Artistry Nexus
          </Typography>
          <StyledButton onClick={() => navigate('/shop')} color="inherit">Shop</StyledButton>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IconButton aria-label="search" onClick={handleSearch} sx={{ color: '#1c1c1c1' }}>
              <SearchIcon />
            </IconButton>
          </Search>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/post')}
            
            sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'purple' } }}
          >
            Post
          </Button>
          {!token && (
            <StyledButton onClick={() => navigate('/signup')} color="inherit">
              Sign Up
            </StyledButton>
          )}
          {!token && (
            <StyledButton onClick={() => navigate('/login')} color="inherit">
              Login
            </StyledButton>
          )}
          {token && (
            <>
              <StyledTypo onClick={() => {
                dispatch(clearSelectedUser)
                navigate('/profile', {replace:true})
              }} color="white">
                {user.username}
              </StyledTypo>
              <IconButton
                edge="end"
                color="inherit"
                href='/profile'
                
                sx={{ marginLeft: 2 }}
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer} variant="temporary">
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default Navbar;
