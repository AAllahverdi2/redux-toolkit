import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
  status: 'idle',
  error: null
};

export const axiosCategories = createAsyncThunk(
  'category/axiosCategories',
  async () => {
    const response = await axios.get('https://northwind.vercel.app/api/categories');
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (newItem) => {
    const response = await axios.post('https://northwind.vercel.app/api/categories', newItem);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  'category/deleteData',
  async (id) => {
    await axios.delete('https://northwind.vercel.app/api/categories/' + id);
    return id;
  }
);

export const axiosCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id) => {
    const response = await axios.get(`https://northwind.vercel.app/api/categories/${id}`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(axiosCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(axiosCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.value = state.value.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(axiosCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
      })
      .addCase(axiosCategoryById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
