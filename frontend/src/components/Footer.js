import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../resources/images/artistryNexusLogo.png'

const FooterContainer = styled(Box)({
  background: 'linear-gradient(to top, #292a2b, #434343)',
  color: '#fff',
  padding: '16px 0',
  marginTop: 'auto',
});

const FooterLink = styled(Link)({
  color: '#fff',
  display: 'block',
  marginBottom: '8px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src={logo} alt="Company Logo" width={50} height={50} />
              <Typography variant="h6" sx={{ ml: '2px', }}>Artistry Nexus</Typography>
            </Box>
            <Typography variant="body2">© 2024 Artistry Nexus. <br /> All rights reserved.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Quick Links</Typography>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">More Links</Typography>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Follow Us</Typography>
            <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
