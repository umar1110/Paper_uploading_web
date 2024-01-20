import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJournalDetails = createAsyncThunk(
  "journalDetails/getJournalDetails",
  async (id) => {
    try {
      const response = await axios.get(`/api/v1/journal/${id}`);

      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

const getJounalDetailsSlice = createSlice({
  name: "journalDetails",
  initialState: {
    journal : null,
    loading: true,
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJournalDetails.pending, (state) => {
        state.loading = true;
        state.journal = null
      })
      .addCase(getJournalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.journal = action.payload.journal;
      })
      .addCase(getJournalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message?action.error.message:"Error Occured";
      });
  }, 
});


export const {clearErrors} = getJounalDetailsSlice.actions;
export default getJounalDetailsSlice.reducer;
