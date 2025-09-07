import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';

export default function SubHeader({ cartCount = 100, cart = {}, products = [], enableCartNav = false }) {
  const navigate = useNavigate();


  const handleCartClick = (event) => {
    if (enableCartNav) {
      navigate('/checkout');
    }
  };

  return (
    <AppBar position="static" color="secondary" elevation={0} sx={{ mb: 2 }}>
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
    </AppBar>
  );
}
