import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#941010', color: 'primary.contrastText', py: 4, mt: 6}}>
    <Container maxWidth="md">
      <Typography variant="h6" gutterBottom>Contact Information</Typography>
      <Divider sx={{ mb: 2, bgcolor: 'primary.contrastText' }} />
      <Typography variant="body1">
        Mobile: <a href="tel:+9194443866993" style={{ color: 'inherit', textDecoration: 'none' }}>+91-94443866993</a>
      </Typography>
      <Typography variant="body1">
        Alternate Mobile: <a href="tel:+919360502058" style={{ color: 'inherit', textDecoration: 'none' }}>+91-9360502058</a>
      </Typography>
      <Typography variant="body1">6/688, Bose colony, Sivakasi - 626189</Typography>
      <Typography variant="body1">
        Email: <a href="mailto:srikaliswaricrackerssvks@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>srikaliswaricrackerssvks@gmail.com</a>
      </Typography>
    </Container>
  </Box>
);

export default Footer;