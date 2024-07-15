import { Container, Typography, Grid, GridListTileBar, IconButton } from "@mui/material";
import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <Container>
           <Typography variant="h1" color="initial">Sup homie</Typography>
           <Grid container spacing={3}>
            {/* <GridListTileBar
              title="hello"
              subtitle="hi"
              actionIcon={
                <IconButton aria-label="">
                    
                </IconButton>
              }
            />
              */}
           </Grid>
        </Container>
    );
}
 
export default Home;