import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';


export default function ProductList({products, cart = {}, onAddToCart, onRemoveFromCart }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handleChange = (event, value) => setPage(value);
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Grid container spacing={2}>
        {paginatedProducts.map((product, idx) => {
          const realIdx = (page - 1) * itemsPerPage + idx;
          const count = cart[realIdx] || 0;
          return (
            <Grid item xs={12} sm={4} md={12} key={realIdx}>
              <Card sx={{ height: '100%', width: 270 }} key={realIdx}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                     <Chip 
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: '#f3e5f5', // subtle purple
                        color: '#6a1b9a',
                        fontWeight: 500
                      }}
                    />
                    <Chip label={product.packType} color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1,   wordBreak: 'break-word',
                        overflowWrap: 'break-word', textAlign: "left"}}>
                    {product.description}
                  </Typography>
                  {/* <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: '#f3e5f5', // subtle purple
                        color: '#6a1b9a',
                        fontWeight: 500
                      }}
                    />
                  </Box> */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.price}
                    </Typography>
                    <Typography variant="h6" color="error.main">
                      ₹{product.discountedPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                    <IconButton aria-label="remove" color="primary" onClick={() => onRemoveFromCart(realIdx)} disabled={count === 0}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center' }}>{count}</Typography>
                    <IconButton aria-label="add" color="primary" onClick={() => onAddToCart(realIdx)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
      </Box>
    </Box>
  );
}
