import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../../logo.svg';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Brand Logo" style={{ height: 40, marginRight: 12 }} />
          <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ fontWeight: 600 }}>
            Fireworks Shop
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ContactMailIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Contact: info@fireworks.com
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
