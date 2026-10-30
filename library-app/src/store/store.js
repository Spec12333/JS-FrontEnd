import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "../services/libraryApi";

export const bookStore = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
});
