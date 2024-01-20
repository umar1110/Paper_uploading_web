import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllJournals = createAsyncThunk(
  "alljournals/getalljournals",
  async ({ page, title, author, year,id }) => {
    console.log(id)
    try {
      const response = await axios.post(
        `/api/v1/admin/journals?page=${page}&title=${
          title ? title : ""
        }&author=${author ? author : ""}&year=${year ? year : 0}&id=${id?id:""}`
      );

      console.log(response.data)
      return response.data;

    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

const allJournalsSlice = createSlice({
  name: "allJournals",
  initialState: {
    journals: [],
    loading: false,
    totalJournals: 0,
    filteredJournals: 0,
    error: null,
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllJournals.pending, (state) => {
        state.loading = true;
        state.journals = [];
        state.error = null;
      })
      .addCase(getAllJournals.fulfilled, (state, action) => {
        // Check if the payload contains an 'error' property

        // Request is successful, update the state
        state.journals = action.payload.journals;
        state.loading = false;
        state.totalJournals = action.payload.totalJournals;
        state.filteredJournals = action.payload.filteredJournals;
        state.error = null;
      })
      .addCase(getAllJournals.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allJournalsSlice.reducer;
