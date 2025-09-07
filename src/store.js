import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const idx = action.payload;
      state.cart[idx] = (state.cart[idx] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const idx = action.payload;
      if (state.cart[idx]) {
        state.cart[idx] -= 1;
        if (state.cart[idx] <= 0) delete state.cart[idx];
      }
    },
    clearCart: (state) => {
      state.cart = {};
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

export default store;
