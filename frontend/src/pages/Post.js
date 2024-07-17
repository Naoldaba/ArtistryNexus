import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { resetPostStatus } from '../reducers/post';
import { postArt } from '../actions/post';

const Post = () => {
  const [artDetails, setArtDetails] = useState({
    title: '',
    description: '',
    type: '',
    price: "",
  });
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.post);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArtDetails((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleImageChange = (event) => setImage(event.target.files[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const artData = {
      ...artDetails,
      arts: image,
    };

    dispatch(postArt(artData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetPostStatus());
    };
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Post Your Art Piece
      </Typography>
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: '0 auto',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            p: 2,
            mb: 4,
            width: '50%',
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="file-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ mb: 2, color: 'purple' }}
            >
              <AddPhotoAlternate />
            </IconButton>
            <Typography variant="body1" component="div">
              {image ? image.name : 'Upload Image'}
            </Typography>
          </label>
          {image && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          )}
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={artDetails.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={artDetails.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <FormControl variant="outlined" required>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={artDetails.type}
              onChange={handleChange}
              label="Type"
              required
            >
              <MenuItem value="painting">Painting</MenuItem>
              <MenuItem value="digital-art">Digital Art</MenuItem>
              <MenuItem value="sculpture">Sculpture</MenuItem>
              <MenuItem value="crafts">Crafts</MenuItem>
              <MenuItem value="photography">Photography</MenuItem>
              <MenuItem value="graphics-design">Graphics Design</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Price"
            variant="outlined"
            name="price"
            value={artDetails.price}
            onChange={handleChange}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: 'purple', '&:hover': { backgroundColor: 'purple' } }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Post;



