import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', py: 4, mt: 6}}>
    <Container maxWidth="md">
      <Typography variant="h6" gutterBottom>Contact Information</Typography>
      <Divider sx={{ mb: 2, bgcolor: 'primary.contrastText' }} />
      <Typography variant="body1">Mobile: +91-9876543210</Typography>
      <Typography variant="body1">Address: 123 Celebration Street, Firework City, India</Typography>
      <Typography variant="body1">Email: info@firework.com</Typography>
    </Container>
  </Box>
);

export default Footer;