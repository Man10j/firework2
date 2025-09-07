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
      <Typography variant="body1">Mobile: +91-94443866993</Typography>
         <Typography variant="body1">Alternate Mobile: +91-9360502058</Typography>
      <Typography variant="body1">6/688, Bose colony, Sivakasi - 626189</Typography>
      <Typography variant="body1">Email: srikaliswaricrackerssvks@gmail.com</Typography>
    </Container>
  </Box>
);

export default Footer;