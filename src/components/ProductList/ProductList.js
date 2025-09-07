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

export const products = [
  {
    name: 'Sparklers',
    description: 'Bright and colorful sparklers for celebrations.',
    price: 120,
    discountedPrice: 100,
    packType: '1 box',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Flower Pots',
    description: 'Safe and fun flower pot fireworks for kids.',
    price: 200,
    discountedPrice: 180,
    packType: '1 pkt',
    category: 'Flower Pots',
  },
  {
    name: 'Rockets',
    description: 'High-flying rockets for a spectacular show.',
    price: 350,
    discountedPrice: 300,
    packType: '1 box',
    category: 'Chakra',
  },
  {
    name: 'Twinkling Stars',
    description: 'Colorful stars that light up the night sky.',
    price: 180,
    discountedPrice: 150,
    packType: '1 pkt',
    category: 'Stars',
  },
  {
    name: 'Ground Chakkar',
    description: 'Spinning ground chakkars for fun.',
    price: 90,
    discountedPrice: 80,
    packType: '1 pkt',
    category: 'Chakra',
  },
  {
    name: 'Pencil',
    description: 'Safe pencil crackers for kids.',
    price: 60,
    discountedPrice: 50,
    packType: '1 pkt',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Atom Bomb',
    description: 'Loud atom bomb crackers.',
    price: 250,
    discountedPrice: 200,
    packType: '1 box',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Deluxe Rockets',
    description: 'Deluxe rockets for a grand show.',
    price: 400,
    discountedPrice: 350,
    packType: '1 box',
    category: 'Rockets',
  },
  {
    name: 'Color Matches',
    description: 'Colorful matches for extra fun.',
    price: 40,
    discountedPrice: 30,
    packType: '1 pkt',
    category: 'Misc',
  },
  {
    name: 'Mini Bomb',
    description: 'Small but loud mini bombs.',
    price: 100,
    discountedPrice: 90,
    packType: '1 pkt',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Flower Basket',
    description: 'Basket of flower pot fireworks.',
    price: 220,
    discountedPrice: 200,
    packType: '1 box',
    category: 'Flower Pots',
  },
  {
    name: 'Whistling Sound',
    description: 'Whistling crackers for extra excitement.',
    price: 130,
    discountedPrice: 120,
    packType: '1 pkt',
    category: 'Whistling',
  },
  {
    name: 'Snake Tablet',
    description: 'Classic snake tablets for kids.',
    price: 70,
    discountedPrice: 60,
    packType: '1 pkt',
    category: 'Misc',
  },
  {
    name: 'Deluxe Sparklers',
    description: 'Long-lasting deluxe sparklers.',
    price: 160,
    discountedPrice: 140,
    packType: '1 box',
    category: 'Sparklers',
  },
  {
    name: 'Big Flower Pot',
    description: 'Large flower pot for a big show.',
    price: 300,
    discountedPrice: 270,
    packType: '1 box',
    category: 'Flower Pots',
  },
  {
    name: 'Deluxe Chakkar',
    description: 'Deluxe spinning chakkars.',
    price: 120,
    discountedPrice: 110,
    packType: '1 pkt',
    category: 'Chakra',
  },
  {
    name: 'Rocket Pack',
    description: 'Pack of assorted rockets.',
    price: 500,
    discountedPrice: 450,
    packType: '1 box',
    category: 'Rockets',
  },
  {
    name: 'Deluxe Bomb',
    description: 'Deluxe bomb for a loud bang.',
    price: 300,
    discountedPrice: 250,
    packType: '1 box',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Colorful Rockets',
    description: 'Rockets with colorful effects.',
    price: 380,
    discountedPrice: 340,
    packType: '1 box',
    category: 'Rockets',
  },
  {
    name: 'Deluxe Flower Pot',
    description: 'Deluxe flower pot for a grand show.',
    price: 350,
    discountedPrice: 320,
    packType: '1 box',
    category: 'Flower Pots',
  },
  {
    name: 'Deluxe Whistling',
    description: 'Deluxe whistling crackers.',
    price: 180,
    discountedPrice: 160,
    packType: '1 pkt',
    category: 'Whistling',
  },
  {
    name: 'Deluxe Snake',
    description: 'Deluxe snake tablets for more fun.',
    price: 90,
    discountedPrice: 80,
    packType: '1 pkt',
    category: 'Misc',
  },
  {
    name: 'Deluxe Pencil',
    description: 'Deluxe pencil crackers for kids.',
    price: 80,
    discountedPrice: 70,
    packType: '1 pkt',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Deluxe Atom Bomb',
    description: 'Deluxe atom bomb for a loud bang.',
    price: 320,
    discountedPrice: 280,
    packType: '1 box',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Deluxe Mini Bomb',
    description: 'Deluxe mini bomb for extra fun.',
    price: 120,
    discountedPrice: 110,
    packType: '1 pkt',
    category: 'Single Sound Cracker',
  },
  {
    name: 'Deluxe Basket',
    description: 'Deluxe basket of flower pots.',
    price: 260,
    discountedPrice: 230,
    packType: '1 box',
    category: 'Flower Pots',
  },
];

export default function ProductList({ cart = {}, onAddToCart, onRemoveFromCart }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handleChange = (event, value) => setPage(value);
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Grid container spacing={2}>
        {paginatedProducts.map((product, idx) => {
          const realIdx = (page - 1) * itemsPerPage + idx;
          const count = cart[realIdx] || 0;
          return (
            <Grid item xs={12} sm={6} md={4} key={realIdx}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {product.name}
                    </Typography>
                    <Chip label={product.packType} color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{
                        backgroundColor: '#f3e5f5', // subtle purple
                        color: '#6a1b9a',
                        fontWeight: 500
                      }}
                    />
                  </Box>
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
