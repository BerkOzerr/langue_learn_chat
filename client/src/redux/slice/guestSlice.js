import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const findGuest = createAsyncThunk(
  "quest/findGuest",
  async (guestName, { rejectWithValue }) => {
    // console.log(guestName);
    try {
      const response = await axios.post(BASE_URL + "guest/find", {
        name: guestName,
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("API hatasi:", error);

      return rejectWithValue(
        error.response?.data || error.message || "Bir hata oluştu",
      );
    }
  },
);

export const guestUserPost = createAsyncThunk(
  "guest/guestUserPost",
  async (_, { rejectWithValue }) => {
    // console.log(BASE_URL + "guest/create");

    try {
      const response = await axios.get(BASE_URL + "guest/create");
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log("API hatasi:", error);

      return rejectWithValue(
        error.response?.data || error.message || "Bir hata oluştu",
      );
    }
  },
);

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    guestName: localStorage.getItem("guestName")
      ? localStorage.getItem("guestName")
      : "",
    isGuest: localStorage.getItem("guestName") ? true : false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(guestUserPost.fulfilled, (state, action) => {
        // console.log(action.payload);
        // console.log(state.isGuest);
        if (action.payload?.status === 200) {
          state.isGuest = true;
          state.guestName = action.payload?.guestName;
          // console.log(state.guestName);
          localStorage.setItem("guestName", action.payload?.guestName);
          toast.success(action.payload?.message);
        }

        // console.log("ok");
      })
      .addCase(guestUserPost.rejected, (state, action) => {
        // Add user to the state array
        state.isGuest = false;
        console.error(action.payload);
        toast.error(action.payload?.errorName);
      });
    builder
      .addCase(findGuest.fulfilled, (state, action) => {
        // console.log(action.payload);
        // console.log(state.isGuest);
        toast.info(action.payload?.message);
        // console.log("ok");
      })
      .addCase(findGuest.rejected, (state, action) => {
        // Add user to the state array
        console.error("findGuest başarısız:", action.payload);
        localStorage.removeItem("guestName");
        toast.error(action.payload?.errorName || "Misafir doğrulanamadı.");
        // localStorage.removeItem("guestName");
        // console.log(state.errorMessage);
        // console.error(action?.payload);
      });
  },
});

export const { guesting } = guestSlice.actions;

export default guestSlice.reducer;
