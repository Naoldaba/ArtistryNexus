import React, { useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio } from '../actions/post';
import ArtCard from './ArtCard';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { artPieces, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {artPieces && artPieces.map((piece) => (
          <Grid item xs={12} sm={6} md={4} key={piece._id}>
            <ArtCard artPiece={piece} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;
