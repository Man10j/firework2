import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


  const Checkout = ({ cart, products, onOrderPlaced }) => {
    const navigate = useNavigate();
    // Prepare cart items
    const [cartState, setCartState] = useState(cart);
    const cartItems = Object.entries(cartState)
      .filter(([idx, count]) => count > 0)
      .map(([idx, count]) => ({
        ...products[idx],
        count,
        idx: Number(idx)
      }));
    const total = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.count, 0);
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: '', phone: '', email: '', address: '' });
  const [toast, setToast] = useState(false);
  const [clearDialog, setClearDialog] = useState(false);
    const handleClearCart = () => setClearDialog(true);
    const handleCancelClear = () => setClearDialog(false);
    const handleConfirmClear = () => {
      setClearDialog(false);
      setCartState({});
      if (onOrderPlaced) onOrderPlaced();
    };

  
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handlePlaceOrder = () => {
      setOpen(false);
      setLoading(true)
fetch('/.netlify/functions/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productLists: cartItems, total: total, userDetails:{
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address
        } })
      })
        .then(res => res.json())
        .then(data => {
          setUser({ name: '', phone: '', address: '' });
          setLoading(false);
          setToast(true);
      const message =  data?.orderId ? `This is to notify that I have placed an order. Order #${data.orderId }` : 'This is to notify that I have placed an order.';
      const whatsappNumber = "919443866993"; // Replace with your desired number (country code + number)
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

          if (onOrderPlaced) onOrderPlaced();
      setTimeout(() => {
        setLoading(false);
        setToast(false);
        navigate('/');
      }, 2000);
        })
        .catch(err => {
          setLoading(false);
          console.error('Error placing order:', err);
        });

      
     
    };
    const handleToastClose = (event, reason) => {
      if (reason === 'clickaway') return;
      setToast(false);
    };
  
    return (
    <>
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<DeleteOutlineIcon />} 
          sx={{ mb: 2, fontWeight: 600, letterSpacing: 1 }}
          onClick={handleClearCart}
        >
          Clear All Items in Cart
        </Button>
        <Card sx={{ minWidth: 340, maxWidth: 420, width: '100%', boxShadow: 3 }}>
      <Dialog open={clearDialog} onClose={handleCancelClear} maxWidth="xs" fullWidth>
        <DialogTitle>Clear Cart?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove all items from your cart?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClear} color="primary">Cancel</Button>
          <Button onClick={handleConfirmClear} color="error" variant="contained">Clear All</Button>
        </DialogActions>
      </Dialog>
          <CardContent sx={{padding: "16px", margin: "10px"}}> 
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              Invoice
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cartItems.length === 0 ? (
              <Typography color="text.secondary" align="center">Your cart is empty.</Typography>
            ) : (
              <>
                {cartItems.map(item => (
                  <Box key={item.idx} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{item.description}</Typography>
                      <Typography variant="body2">x{item.count}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">₹{item.discountedPrice} each</Typography>
                      <Typography variant="body2" color="text.primary">₹{item.discountedPrice * item.count}</Typography>
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">₹{total}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Add More Items</Button>
                  <Button variant="contained" color="success" onClick={handleOpen}    disabled={cartItems.length === 0 || total <= 5000} >Proceed</Button>
                </Box>
                {total <= 5000 && cartItems.length > 0 && (
                    <Typography color="error" sx={{ mt: 3, fontWeight: 500 }}>
                      Add items worth ₹5000 to proceed.
                    </Typography>
                  )}

                <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                  <DialogTitle>Enter Your Details</DialogTitle>
                  <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField label="Name" name="name" value={user.name} onChange={handleChange} fullWidth required />
                    <TextField label="Phone" name="phone" value={user.phone} onChange={handleChange} fullWidth required />
                    {/* <TextField label="Email" name="email" value={user.email} onChange={handleChange} fullWidth required type="email" /> */}
                    <TextField label="Address" name="address" value={user.address} onChange={handleChange} fullWidth required multiline minRows={2} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      variant="contained" 
                      color="success"
                      disabled={!user.name || !user.phone || !user.address}
                    >
                      Place Order
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={toast} autoHideDuration={2000} onClose={handleToastClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleToastClose} severity="success" sx={{ width: '100%' }} elevation={6} variant="filled">
          Order placed!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Checkout;
