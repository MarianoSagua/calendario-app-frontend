import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice } from "./slices";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
