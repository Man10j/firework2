import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
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
  const [search, setSearch] = useState('');
  const itemsPerPage = 9;
  const handleChange = (event, value) => setPage(value);

  // Filter products by search (category or description)
  const filteredProducts = products.filter(product => {
    const val = search.trim().toLowerCase();
    if (!val) return true;
    return (
      product.category.toLowerCase().includes(val) ||
      product.description.toLowerCase().includes(val)
    );
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', sm: 'stretch' } }}>
  
         <TextField
        label="Search by category or description"
        variant="outlined"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        sx={{ mb: 3, width: { xs: '100%', sm: 400 }, position: { xs: 'sticky', md: 'relative' }, top: { xs: 0, sm: 'auto' }, zIndex: 1201, background: { xs: '#fff', sm: 'inherit' },}}
        InputProps={{
          endAdornment: (
            search ? (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={() => { setSearch(''); setPage(1); }} edge="end">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null
          )
        }}
      />
     
      <Grid container spacing={2} sx={{justifyContent: { xs: 'center', md: 'left' }}}>
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
                        backgroundColor: '#941010', // subtle purple
                        color: '#fff',
                        fontWeight: 500,
                        borderRadius: "7px"
                      }}
                    />
                    <Chip label={product.packType} color="primary" size="small" sx={{
                       borderRadius: "7px"
                    }} />
                  </Box>
                  <Typography variant="body2" color="#211919" sx={{ mb: 1,   wordBreak: 'break-word',
                        overflowWrap: 'break-word', textAlign: "left", fontWeight: 500, fontSize: '18px'}}>
                    {product.description}
                  </Typography>
          
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
