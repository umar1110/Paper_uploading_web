import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllusers = createAsyncThunk(
  "allusers/getallusers",
  async ({ page, email, name }) => {
    try {
      const response = await axios.get(`/api/v1/admin/users?page=${page}&email=${email}&name=${name}`
      // const response = await axios.get(`/api/v1/admin/users?page=${page}&name=${name ? name : ""}&email=${email ? email : ""}`

      );

      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

const allusersSlice = createSlice({
  name: "allusers",
  initialState: {
    users: [],
    loading: false,
    totalUsers: 0,
    filteredUsers: 0,
    error: null,
    success:false,
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllusers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        // Check if the payload contains an 'error' property

        // Request is successful, update the state
        state.users = action.payload.users;
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.filteredUsers = action.payload.filteredUsers;
        state.error = null;
        state.success = true;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const {clearErrors} = allusersSlice.actions;
export default allusersSlice.reducer;
