import admin from "./admin";
import categories from "./categories";
import { configureStore } from "@reduxjs/toolkit";
import theme from "./theme";
import products from "./products";

export default configureStore({
  reducer: { admin, categories, products, theme },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
