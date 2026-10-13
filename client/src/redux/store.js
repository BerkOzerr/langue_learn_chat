import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "./slice/guestSlice";

export const store = configureStore({
  reducer: {
    guest: guestReducer,
  },
});
