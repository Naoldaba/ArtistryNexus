import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import africanFaces from '../resources/images/_African Faces_ Greeting Card for Sale by Benbubble23.jpeg'
import africanbackground from '../resources/images/Download Pan African Seamless Background for free.jpeg'
import background from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg'
import background2 from '../resources/images/890fb685-2052-499e-8644-10b521761155.jpeg'
import africanArt from '../resources/images/_African Faces_ Greeting Card for Sale by Benbubble23.jpeg'
import snail from '../resources/images/Download free vector design files for CNC and Laser cutting machines.jpeg'

const BackgroundImage = styled(Box)({
  backgroundImage: `url('${background2}')`,
  objectFit: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledCard = styled(Card)({
  display: 'flex',
  width: '80%',
  height: '80vh',
});

const ImageSection = styled(Box)(({ theme }) => ({
  width: '50%',
//   backgroundColor: '#383c42',
  backgroundImage: `url('${background}')`,
  objectFit: 'cover',
  overlay: 'inherit',

  backgroundPosition: 'center',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
  padding: theme.spacing(4),
  color: 'white',
  
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const Signup = () => {
  return (
    <BackgroundImage>
      <StyledCard>
        <ImageSection>
          <Box
            // component='img'
            src={africanArt}
            alt="Join us"
            sx={{ width: '300px',  objectFit: 'cover',}}
            
          />
          <Typography  variant="h3" gutterBottom>
            JOIN US <br />
            
          </Typography>
          <Typography  variant="h5" gutterBottom>
            THE LARGEST ART COMMUNITY IN AFRICA
          </Typography>
          
          <Typography   variant="body1" gutterBottom>
            Be a member of this inspiring and vibrant art hub.
          </Typography>
        </ImageSection>
        <FormSection>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Full Name"
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Password"
              type="password"
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Confirm Password"
              type="password"
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 2, backgroundColor: 'purple', '&:hover': {backgroundColor: 'purple', } }}
            >
              Sign Up
            </Button>
          </form>
        </FormSection>
      </StyledCard>
    </BackgroundImage>
  );
};

export default Signup;
