import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "./slice/guestSlice";
import roomReducer from "./slice/roomSlice";

export const store = configureStore({
  reducer: {
    guest: guestReducer,
    room: roomReducer,
  },
});
