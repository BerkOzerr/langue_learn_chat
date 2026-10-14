import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "./slice/guestSlice";
import roomReducer from "./slice/roomSlice";
import themaReducer from "./slice/themaSlice";
export const store = configureStore({
  reducer: {
    guest: guestReducer,
    thema: themaReducer,
    room: roomReducer,
  },
});
