import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import background2 from '../resources/images/890fb685-2052-499e-8644-10b521761155.jpeg';
import background from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg';
import { signupUser } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';


const BackgroundImage = styled(Box)({
  backgroundImage: `url('${background2}')`,
  objectFit: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
});

const StyledCard = styled(Card)({
  display: 'flex',
  width: '80%',
  margin: '20px',
  marginTop: '20px'
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

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { status, error, token} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    dateOfBirth: '',
  });

  const steps = ['Account Details', 'Personal Information'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 0) {
      if (formData.password && formData.username && formData.password === formData.confirmPassword) {
        setStep((prevStep) => prevStep + 1);
      } else {
        alert('Passwords do not match');
      }
    } else {
      const {confirmPassword, ...other } = formData
      dispatch(signupUser(other))
      
    }
  };
 
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

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
            
          <Typography variant="h4">Sign Up</Typography>
          <Stepper activeStep={step} alternativeLabel sx={{ mt: 2, mb: 2 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel></StepLabel>
                </Step>
                ))}
            </Stepper>  
          
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 0 && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
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
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              </>
            )}
            {step === 1 && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
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
              </>
            )}
            
            <Box display="flex" justifyContent="space-between" mt={2}>
              {step > 0 && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBack}
                  sx={{
                    backgroundColor: 'grey',
                    '&:hover': { backgroundColor: 'grey' },
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{
                  backgroundColor: 'purple',
                  '&:hover': { backgroundColor: 'purple' },
                }}
              >
                {step === 0 ? 'Next' : 'Sign Up'}
              </Button>
              {status === 'loading' && <Typography>Loading...</Typography>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error.msg || 'Login failed'}</Alert>}
          
              
            </Box>
            
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Have an account?{' '}
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ color: 'purple' }}
              >
                Login
              </Button>
            </Typography>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="caption">
              By signing up, you agree to our{' '}
              <Button variant="text" sx={{ color: 'purple' }}>
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="text" sx={{ color: 'purple' }}>
                Privacy Policy
              </Button>
              .
            </Typography>
          </Box>
        </FormSection>
      </StyledCard>
    </BackgroundImage>
  );
};

export default Signup;
