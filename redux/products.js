import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    viewdProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    getProduct: (state, action) => {
      state.viewdProducts = state.products.filter(
        (product) => product.category._id === action.payload
      );
    },
  },
});

export const { setProducts, getProduct } = productsSlice.actions;
export default productsSlice.reducer;
