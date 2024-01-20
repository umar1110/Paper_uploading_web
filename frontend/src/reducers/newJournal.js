import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitJournal = createAsyncThunk(
  "newJournal/submit",
  async (formData) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      console.log(formData)
      const response = await axios.post(
        "/api/v1/journal/submit",
        formData,
        config
      );
      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

const newJournalSlice = createSlice({
  name: "newJournal",
  initialState: { loading: false, error: null },
  reducers: {
    resetNewJournal(state) {
      state.success = false;
    },
    clearErrors(state){
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitJournal.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.journal = action.payload.journal;
      })
      .addCase(submitJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {resetNewJournal,clearErrors} = newJournalSlice.actions;
export default newJournalSlice.reducer;
