import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getMyJournals = createAsyncThunk(
  "myJournals/getMyJournals",
  async (page) => {
    // sliceName / actionName  = type
    try {
      const response = await axios.get(`/api/v1/me/journals?page=${page}`);
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

// Reducers
const myJournalsSlice = createSlice({
  name: "myJournals",
  initialState: {
    journals: [],
    loading: false,
    totalJournals: 0,
    filteredJournals: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMyJournals.pending, (state) => {
        state.loading = true;
        state.journals = [];
        state.error = null;
      })
      .addCase(getMyJournals.fulfilled, (state, action) => {
        // Check if the payload contains an 'error' property

        // Request is successful, update the state
        state.journals = action.payload.journals;
        state.loading = false;
        
        state.totalJournals = action.payload.totalJournals;
        state.error = null;
      })
      .addCase(getMyJournals.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default myJournalsSlice.reducer;
