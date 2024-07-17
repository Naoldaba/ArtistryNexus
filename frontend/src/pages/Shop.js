// import { Container, Button, Box} from "@mui/material"
// import ImageGrid from "../components/ImageGrid"
// import { useNavigate } from "react-router-dom"

// const Shop = () => {
//     const navigate = useNavigate()
//   return (
//     <Container maxWidth="md">
//         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, py: 2, backgroundColor: '#222', }}>
//             <Button variant="contained" color="primary" onClick={() => navigate('/')}>Home</Button>
//             <Button variant="contained" color="primary" onClick={() => navigate('/craft')}>Craft</Button>
//             <Button variant="contained" color="primary" onClick={() => navigate('/photography')}>Photography</Button>
//         </Box>
//         <ImageGrid></ImageGrid>
      
//     </Container>
//   )
// }

// export default Shop



// import React, { useRef } from 'react';
// import { Container, Box, Grid, Typography, Button } from '@mui/material';

// const artData = [
//   { id: 1, tag: 'painting', title: 'Sunset Landscape', description: 'A beautiful sunset landscape.' },
//   { id: 2, tag: 'sculpture', title: 'Marble Statue', description: 'A detailed marble statue.' },
//   { id: 3, tag: 'digital', title: 'Abstract Digital Art', description: 'An abstract digital art piece.' },
//   { id: 4, tag: 'photography', title: 'Mountain Photography', description: 'A stunning mountain photograph.' },
//   { id: 5, tag: 'painting', title: 'Sunset Landscape', description: 'A beautiful sunset landscape.' },
//   { id: 6, tag: 'sculpture', title: 'Marble Statue', description: 'A detailed marble statue.' },
//   { id: 7, tag: 'digital', title: 'Abstract Digital Art', description: 'An abstract digital art piece.' },
//   { id: 8, tag: 'photography', title: 'Mountain Photography', description: 'A stunning mountain photograph.' },


// ];

// const Shop = () => {
//   const paintingRef = useRef(null);
//   const sculptureRef = useRef(null);
//   const digitalRef = useRef(null);
//   const photographyRef = useRef(null);

//   const handleScroll = (ref) => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Shop
//       </Typography>
//       <Box mb={2}>
//         <Button onClick={() => handleScroll(paintingRef)}>Painting</Button>
//         <Button onClick={() => handleScroll(sculptureRef)}>Sculpture</Button>
//         <Button onClick={() => handleScroll(digitalRef)}>Digital</Button>
//         <Button onClick={() => handleScroll(photographyRef)}>Photography</Button>
//       </Box>
//       <Grid container spacing={2}>
//         {artData.map((art) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             key={art.id}
//             ref={
//               art.tag === 'painting'
//                 ? paintingRef
//                 : art.tag === 'sculpture'
//                 ? sculptureRef
//                 : art.tag === 'digital'
//                 ? digitalRef
//                 : photographyRef
//             }
//           >
//             <Box border={1} borderRadius={2} p={2}>
//               <Typography variant="h6">{art.title}</Typography>
//               <Typography variant="body1">{art.description}</Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Shop;



import React, { useRef } from 'react';
import { Container, Box, Grid, Typography, Button, Divider } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

const artData = [
  { id: 1, tag: 'painting', title: 'Sunset Landscape', description: 'A beautiful sunset landscape.', price: '$200', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },
  { id: 2, tag: 'sculpture', title: 'Marble Statue', description: 'A detailed marble statue.', price: '$500', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },
  { id: 3, tag: 'digital', title: 'Abstract Digital Art', description: 'An abstract digital art piece.', price: '$150', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },
  { id: 4, tag: 'photography', title: 'Mountain Photography', description: 'A stunning mountain photograph.', price: '$250', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },
  { id: 5, tag: 'crafts', title: 'crafts', description: 'A stunning craft work.', price: '$250', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },
  { id: 6, tag: 'graphics-design', title: 'crafts', description: 'A stunning craft work.', price: '$250', imgUrl: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286' },

];

const ShopPage = () => {
  const paintingRef = useRef(null);
  const sculptureRef = useRef(null);
  const digitalRef = useRef(null);
  const photographyRef = useRef(null);

  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const groupedArtData = artData.reduce((acc, art) => {
    if (!acc[art.tag]) {
      acc[art.tag] = [];
    }
    acc[art.tag].push(art);
    return acc;
  }, {});

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>
      <Box mb={2}>
        <Button onClick={() => handleScroll(paintingRef)}>Painting</Button>
        <Button onClick={() => handleScroll(sculptureRef)}>Sculpture</Button>
        <Button onClick={() => handleScroll(digitalRef)}>Digital</Button>
        <Button onClick={() => handleScroll(photographyRef)}>Photography</Button>
      </Box>
      {Object.keys(groupedArtData).map((tag) => (
        <Box key={tag} mb={4} ref={tag === 'painting' ? paintingRef : tag === 'sculpture' ? sculptureRef : tag === 'digital' ? digitalRef : photographyRef}>
          <Typography variant="h5" mb={2}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            {groupedArtData[tag].map((art) => (
              <Grid item xs={12} sm={6} md={4} key={art.id}>
                <Card sx={{ width: '100%' }}>
                  <Box>
                    <Typography level="title-lg">{art.title}</Typography>
                    <Typography level="body-sm">{art.description}</Typography>
                    <IconButton
                      aria-label={`bookmark ${art.title}`}
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                      <BookmarkAdd />
                    </IconButton>
                  </Box>
                  <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                      src={art.imgUrl}
                      srcSet={`${art.imgUrl}?auto=format&fit=crop&w=286&dpr=2 2x`}
                      loading="lazy"
                      alt={art.title}
                    />
                  </AspectRatio>
                  <CardContent orientation="horizontal">
                    <Box>
                      <Typography level="body-xs">Total price:</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {art.price}
                      </Typography>
                    </Box>
                    <Button
                      variant="solid"
                      size="md"
                      color="primary"
                      aria-label={`Explore ${art.title}`}
                      onClick={() => {
                      }}
                      sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default ShopPage;
