import { Container, Typography, Box, Grid, GridListTileBar, IconButton } from "@mui/material";
import Navbar from "../components/Navbar";
import ImageGrid from "../components/ImageGrid";


  import pic1 from '../resources/images/_African Faces_ Greeting Card for Sale by Benbubble23.jpeg'
import pic2 from '../resources/images/drum.jpg'
import pic3 from '../resources/images/hammer.jpg'
import pic4 from '../resources/images/abstract face.jpeg'
import pic7 from '../resources/images/sheba.jpeg'
import pic6 from '../resources/images/Basile.jpeg'
import pic5 from '../resources/images/d4859d96-3f95-493a-9bd1-d96778ba43f0.jpeg'
import pic8 from '../resources/images/Download free vector design files for CNC and Laser cutting machines.jpeg'
import pic9 from '../resources/images/boy.jpg'
import pic10 from '../resources/images/burji.webp'
import pic11 from '../resources/images/queen.jpg'
import pic12 from '../resources/images/elderly man.jpg'

const images = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5, 
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
  pic11,
  pic12
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