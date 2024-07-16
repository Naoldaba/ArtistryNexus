import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import TabSelector from '../components/TabSelector';

const Landing = () => {
  const {user, token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    // Implement logout functionality
    console.log('User logged out');
  };

  return (
    <Box>
      
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" sx={{color:'black'}} gutterBottom>
              Welcome {user.username}
            </Typography>
            <Typography variant="body1">
              Here you can find the latest updates, manage your profile, and much more.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Your Profile</Typography>
                <Typography variant="body2">
                  Manage your profile information and settings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit Profile</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Body</Typography>
                <Typography variant="body2">
                  View your recent notifications and alerts.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Notifications</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <TabSelector />
        
      </Container>
    </Box>
  );
};

export default Landing;
