import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (room, { rejectWithValue }) => {
    // console.log(BASE_URL + "room/create");
    // console.log(room);
    try {
      const response = await axios.post(BASE_URL + "room/create", room);
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

export const getRoomList = createAsyncThunk(
  "room/getRoomList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "room");
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

export const joinRoom = createAsyncThunk(
  "room/joinRoom",
  async ({ roomId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}room/${roomId}/join`, {
        userId,
      });

      return response.data.room;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoom.pending, (state) => {
      console.log("Loading...");
      state.isLoading = true;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      console.log(action.payload);
      // const newRoom = action.payload;

      // if (!state.rooms.some((room) => room.id === newRoom.id)) {
      //   state.rooms = [...state.rooms, newRoom];
      // }
      console.log("ok");
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      console.log(action?.payload);
      console.error("error");
    });

    ///////
    builder.addCase(getRoomList.pending, (state) => {
      // console.log("Loading...");
      state.isLoading = true;
    });
    builder.addCase(getRoomList.fulfilled, (state, action) => {
      console.log(action.payload);
      state.rooms = action.payload;

      // console.log("ok");
    });
    builder
      .addCase(getRoomList.rejected, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        console.error("error");
      })

      .addCase(joinRoom.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedRoom = action.payload;

        state.rooms = state.rooms.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room,
        );
      })
      .addCase(joinRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Odaya katılınamadı.";
      });
  },
});

export default roomSlice.reducer;
