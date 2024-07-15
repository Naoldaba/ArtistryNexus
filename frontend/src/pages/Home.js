import { Container, Typography, Box, Grid, GridListTileBar, IconButton } from "@mui/material";
import Navbar from "../components/Navbar";
import ImageGrid from "../components/ImageGrid";

const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];
const Home = () => {
    return (
        <Container>
           <Typography variant="h1" color="initial">Sup homie</Typography>
           {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
                {images.map((src, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <img src={src} alt={`image-${index}`} style={{ width: '100%', borderRadius: '8px' }} />
                </Grid>
                ))}
            </Grid>
            </Box> */}
            <ImageGrid>

            </ImageGrid>
        </Container>
    );
}
 
export default Home;