// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

// export default function BasicCard() {
//   return (
//     <Card sx={{ width: 320 }}>
//       <div>
//         <Typography level="title-lg">Yosemite National Park</Typography>
//         <Typography level="body-sm">April 24 to May 02, 2021</Typography>
//         <IconButton
//           aria-label="bookmark Bahamas Islands"
//           variant="plain"
//           color="neutral"
//           size="sm"
//           sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
//         >
//           <BookmarkAdd />
//         </IconButton>
//       </div>
//       <AspectRatio minHeight="120px" maxHeight="200px">
//         <img
//           src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
//           srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
//           loading="lazy"
//           alt=""
//         />
//       </AspectRatio>
//       <CardContent orientation="horizontal">
//         <div>
//           <Typography level="body-xs">Total price:</Typography>
//           <Typography fontSize="lg" fontWeight="lg">
//             $2,900
//           </Typography>
//         </div>
//         <Button
//           variant="solid"
//           size="md"
//           color="primary"
//           aria-label="Explore Bahamas Islands"
//           sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
//         >
//           Explore
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }





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
