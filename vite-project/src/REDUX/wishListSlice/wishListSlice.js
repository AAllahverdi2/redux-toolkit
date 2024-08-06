import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || []
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      if (state.items.find(existingItem => existingItem.id === item.id)) {
        alert('Element artıq arzular siyahısında var');
      } else {
        state.items.push(item);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishList: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  }
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
