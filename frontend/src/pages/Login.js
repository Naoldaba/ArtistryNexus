import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/auth'; 
import background2 from '../resources/images/890fb685-2052-499e-8644-10b521761155.jpeg';
import background from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg';
import { useEffect } from 'react';

const BackgroundImage = styled(Box)({
  backgroundImage: `url('${background2}')`,
  objectFit: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
});

const StyledCard = styled(Card)({
  display: 'flex',
  width: '80%',
  minHeight: '80vh',
});

const ImageSection = styled(Box)(({ theme }) => ({
  width: '50%',
  backgroundImage: `url('${background}')`,
  objectFit: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(4),
  color: 'white',
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4),
  paddingTop: '20px',
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, token} = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials, 'cred login')
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token]);
  return (
    <BackgroundImage>
      <StyledCard>
        <ImageSection>
          <Typography variant="h3" gutterBottom>
            JOIN US <br />
          </Typography>
          <Typography variant="h5" gutterBottom>
            THE LARGEST ART COMMUNITY IN AFRICA
          </Typography>
          <Typography variant="body1" gutterBottom>
            Be a member of this inspiring and vibrant art hub.
          </Typography>
        </ImageSection>
        <FormSection>
          <Typography variant="h4">
            Log In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={handleChange}
              InputProps={{
                sx: {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: 'purple',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                sx: {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: 'purple',
                  },
                },
              }}
            />
            {status === 'loading' && <Typography>Loading...</Typography>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error.msg || 'Login failed'}</Alert>}
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: 'purple',
                '&:hover': { backgroundColor: 'purple' },
              }}
            >
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account? <Button variant="text" onClick={() => navigate('/signup')} sx={{ color: 'purple' }}>Signup</Button>
            </Typography>
          </Box>
        </FormSection>
      </StyledCard>
    </BackgroundImage>
  );
};

export default Login;
