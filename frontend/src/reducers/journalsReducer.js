import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async acitons
//
export const getJournals = createAsyncThunk(
  "journals/getJournals",
  async ({ page, title, author, year }) => {
    // sliceName / actionName
    try {
      // console.log("title" ,page,year)
      const response = await axios.get(
        `/api/v1/journals?page=${page}&title=${title ? title : ""}&author=${
          author ? author : ""
        }&year=${year ? year : 0}`
      );

      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);


// export const submitJounal = createAsyncThunk("journal/submitJournal")

// Reducers
const journalsSlice = createSlice({
  name: "journals",
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
      .addCase(getJournals.pending, (state) => {
        state.loading = true;
        state.journals = [];
        state.error = null;
      })
      .addCase(getJournals.fulfilled, (state, action) => {
        // Check if the payload contains an 'error' property

        // Request is successful, update the state
        state.journals = action.payload.journals;
        state.loading = false;
        state.totalJournals = action.payload.totalJournals;
        state.filteredJournals = action.payload.filteredJournals;
        state.error = null;
      })
      .addCase(getJournals.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export default journalsSlice.reducer;

// export const { setUserName, setUserEmail } = userSlice.actions;
