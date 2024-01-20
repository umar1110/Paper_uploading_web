import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async acitons
//
export const deleteUser = createAsyncThunk(
  "deleteUserState/deleteUser",
  async (id) => {
    // sliceName / actionName
    try {
      console.log(id);
      const response = await axios.get(`/api/v1/admin/delete/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

export const changeRole = createAsyncThunk(
  "editUser/changerole",
  async ({id,role}) => {
    // sliceName / actionName
    try {
      // console.log(id);
      console.log(id,role)
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.put(`/api/v1/admin/role/${id}`,{role},config);

      return response.data;
    } catch (error) {
      console.log(error);
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);



// export const submitJounal = createAsyncThunk("journal/submitJournal")

// Reducers
const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    success: false,
    user: "",
    message: "",
    error: null,
  },
  reducers: {
    resetDelete(state) {
      state.success = false;
    },
    clearDelErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.user = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      }).addCase(changeRole.pending, (state) => {
        state.loading = true;
        state.user = "";
      })
      .addCase(changeRole.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(changeRole.rejected, (state, action) => {
        // Update the state with the error message
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const { resetDelete, clearDelErrors } = editUserSlice.actions;
export default editUserSlice.reducer;

// export const { setUserName, setUserEmail } = userSlice.actions;
