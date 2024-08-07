import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  items: JSON.parse(localStorage.getItem('basket')) || [],
  totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
  count: JSON.parse(localStorage.getItem('count')) || 0
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    calculateTotals: (items) => {
      let totalPrice = 0;
      let count = 0;
      items.forEach(item => {
        totalPrice += (item.price * (item.quantity || 1));
        count += item.quantity || 1;
      });
      return { totalPrice, count };
    },
    addToBasket: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(existingItem => existingItem.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push(item);
      }
      const totals = basketSlice.caseReducers.calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.count = totals.count;
      localStorage.setItem('basket', JSON.stringify(state.items));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
      localStorage.setItem('count', JSON.stringify(state.count));
      toast.success("added to basket")
      alert("item added olundu")

    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      const totals = basketSlice.caseReducers.calculateTotals(state.items);
      state.totalPrice = totals.totalPrice;
      state.count = totals.count;
      localStorage.setItem('basket', JSON.stringify(state.items));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
      localStorage.setItem('count', JSON.stringify(state.count));
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        const totals = basketSlice.caseReducers.calculateTotals(state.items);
        state.totalPrice = totals.totalPrice;
        state.count = totals.count;
        localStorage.setItem('basket', JSON.stringify(state.items));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        localStorage.setItem('count', JSON.stringify(state.count));
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== id);
        }
        const totals = basketSlice.caseReducers.calculateTotals(state.items);
        state.totalPrice = totals.totalPrice;
        state.count = totals.count;
        localStorage.setItem('basket', JSON.stringify(state.items));
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        localStorage.setItem('count', JSON.stringify(state.count));
      }
    }
  }
});

export const { addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity } = basketSlice.actions;

export default basketSlice.reducer;
