




import React from 'react';
import { Card, CardContent, CardActions, Typography, Grid, Box, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectArt } from '../reducers/post';

const ArtCard = ({ artPiece }) => {
  const { title, description, type, price, images } = artPiece;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDetails = () => {
      dispatch(selectArt(artPiece))
      navigate('/art-details', {state: artPiece})
  } 

  return (
    <Card sx={{ display: 'flex', maxWidth: 800, m: 2, borderRadius: 3, boxShadow: 3 }}>
      <Grid container>

        <Grid item xs={12} md={12} sx={{ backgroundColor: '#e0e0e0' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            {images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Art piece ${index + 1}`}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '8px' }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} sx={{ backgroundColor: '#f5f5f5' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
            <Typography variant="h5" component="div" sx={{ mb: 2, color: 'purple' }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {type}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
            <Typography variant="h6" component="div" sx={{ mt: 2, color: 'purple' }}>
              ${price}
            </Typography>
            <Button variant="text" onClick={handleDetails}  sx={{color: 'purple', ml: 'auto'}}>
              more
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ArtCard;
