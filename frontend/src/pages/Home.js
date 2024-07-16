import { Container, Typography, Box, Grid, GridListTileBar, IconButton } from "@mui/material";
import Navbar from "../components/Navbar";
import ImageGrid from "../components/ImageGrid";


  import pic1 from '../resources/images/_African Faces_ Greeting Card for Sale by Benbubble23.jpeg'
import pic2 from '../resources/images/81a4e035-a2ef-4d25-9ef0-41fbc356f9c4.jpeg'
import pic3 from '../resources/images/890fb685-2052-499e-8644-10b521761155.jpeg'
import pic4 from '../resources/images/abstract face.jpeg'
import pic5 from '../resources/images/artistryNexusLogo.png'
import pic6 from '../resources/images/Basile.jpeg'
import pic7 from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg'
import pic8 from '../resources/images/Download free vector design files for CNC and Laser cutting machines.jpeg'
const images = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5, 
  pic6,
  pic7,
  pic8,
  'https://via.placeholder.com/200x300',
  'https://via.placeholder.com/500x400',
  'https://via.placeholder.com/600x500',
  'https://via.placeholder.com/100x100',
];

const Home = () => {
    return (
        <Container>
           <Typography variant="h1" color="white">Art</Typography>

           {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
                {images.map((src, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <img src={src} alt={`image-${index}`} style={{ width: '100%', borderRadius: '8px' }} />
                </Grid>
                ))}
            </Grid>
            </Box> */}
            <ImageGrid images={images}>

            </ImageGrid>
        </Container>
    );
}
 
export default Home;