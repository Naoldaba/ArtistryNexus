import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer';
import { Box, CssBaseline, Button } from "@mui/material";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />
      <Box position="fixed" top="0" width="100%" zIndex="1000">
        <Navbar />
      </Box>
      <Box component="main" sx={{ marginTop: '64px', flexGrow: 1, backgroundColor: 'white', color: '#fff', overflowY: 'auto' }}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, py: 2, backgroundColor: '#222', }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>Home</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/craft')}>Craft</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/photography')}>Photography</Button>
        </Box> */}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
