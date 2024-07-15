import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer';
import { Box, CssBaseline } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" sx={{flexGrow: '1', backgroundColor: '', color: 'white'}} >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
