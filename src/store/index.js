import { authApi } from "../services/authApi";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { shopApi } from "../services/shopApi";
import shopSlice from "../features/shop/shopSlice";
import { recipeApi } from "../services/recipeApi"; // Agrega la importación de tu archivo recipeApi

const store = configureStore({
  reducer: {
    shop: shopSlice,
    cart: cartSlice,
    auth: authSlice,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer, // Agrega el reducer de recipeApi
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      shopApi.middleware,
      authApi.middleware,
      recipeApi.middleware
    ); // Agrega el middleware de recipeApi
  },
});

setupListeners(store.dispatch);

export default store;
