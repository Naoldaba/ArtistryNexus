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
      <Box component="main" sx={{ marginTop: '64px', flexGrow: 1, backgroundColor: 'white', color: 'black', overflowY: 'auto' }}>
        
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
