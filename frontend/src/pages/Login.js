import React from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import africanArt from '../resources/images/_African Faces_ Greeting Card for Sale by Benbubble23.jpeg';
import background2 from '../resources/images/890fb685-2052-499e-8644-10b521761155.jpeg';
import background from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg';
import { useNavigate } from 'react-router-dom';

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
  minHeight: '80vh'
  
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
  paddingTop: '20px'
}));

const Login = () => {
    const navigate = useNavigate()

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
          <form>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              type="email"
              required
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
              type="password"
              required
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
