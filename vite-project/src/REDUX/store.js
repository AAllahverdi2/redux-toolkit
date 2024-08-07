import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categorySlice/Category.Slice'
import wishListReducer from '../REDUX/wishListSlice/wishListSlice'; 
import basketReducer from "./basketSlice/basketSlice";
import { categoriesApi } from "../services/CategorySlice/categortSlice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        wishlist: wishListReducer,
        basket: basketReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoriesApi.middleware),
})