import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function ProductList({products, cart = {}, onAddToCart, onRemoveFromCart }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 9;
  const handleChange = (event, value) => setPage(value);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products by category and search
  const filteredProducts = products.filter(product => {
    const val = search.trim().toLowerCase();
    const matchesSearch = !val || product.category.toLowerCase().includes(val) || product.description.toLowerCase().includes(val);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <>
      <Box sx={{ p: { xs: 1, sm: 2 }, minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', sm: 'stretch' }, mt: 2 }}>
         <Alert severity="info" sx={{ position: 'relative', maxWidth: '100%', fontWeight: 'bold', textAlign: 'center' }}>
        Minimum order is ₹5000. We provide service in Tamil and Hindi
      </Alert>
      <Box sx={{ 
        display: "flex",
        flexDirection : {xs: "column", md: "row"},
        justifyContent : "space-between",
        mt : 3
      }}>
      <TextField
        label="Search by category or description"
        variant="outlined"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        sx={{ mb: 2, width: { xs: '100%', sm: 400 }, background: { xs: '#fff', sm: 'inherit' },}}
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
      <FormControl sx={{ mb: 3, minWidth: 180, maxWidth: 320 }} size="small">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Category"
          onChange={e => { setSelectedCategory(e.target.value); setPage(1); }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      <Grid container spacing={2} sx={{justifyContent: { xs: 'center', md: 'left' }}}>
        {paginatedProducts.map((product, idx) => {
          const count = cart[product.id] || 0;
          return (
            <Grid item xs={12} sm={4} md={12} key={product.id}>
              <Card sx={{ height: '100%', width: 270 }} key={product.id}>
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
                    <IconButton aria-label="remove" color="primary" onClick={() => onRemoveFromCart(product.id)} disabled={count === 0}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      inputProps={{ min: 0, style: { textAlign: 'center', width: 48 } }}
                      value={count}
                      onChange={e => {
                        const val = Math.max(0, parseInt(e.target.value) || 0);
                        const diff = val - count;
                        if (diff > 0) {
                          for (let i = 0; i < diff; i++) onAddToCart(product.id);
                        } else if (diff < 0) {
                          for (let i = 0; i < -diff; i++) onRemoveFromCart(product.id);
                        }
                      }}
                      size="small"
                    />
                    <IconButton aria-label="add" color="primary" onClick={() => onAddToCart(product.id)}>
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
    </>
  );
}
