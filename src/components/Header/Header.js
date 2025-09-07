import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

export default function Header({cartCount}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   const navigate = useNavigate();


  const handleCartClick = (event) => {
      navigate('/checkout');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <img src={logo} alt="Brand Logo" style={{ height: 40, marginRight: 12 }} /> */}
          <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ fontWeight: 600 }}>
            SRI KALISWARI CRACKERS
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <ContactMailIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              +91 9443866993  
              +91 9360502058
          </Typography> */}
           <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <IconButton size="large" color="inherit" onClick={handleCartClick}>
            <Badge 
              badgeContent={cartCount} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  minWidth: 28,
                  height: 28,
                  borderRadius: '50%',
                  boxShadow: '0 0 0 2px #fff',
                }
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
