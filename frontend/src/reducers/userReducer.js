import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  try {
    // console.log("fetch");
    const response = await axios.get("/api/v1/me");
    return response.data;
  } catch (error) {
    // console.log(error.response.data.error);
    const customError = new Error(error.response.data.error);
    throw customError;
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ loginEmail, loginPassword }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        "/api/v1/login",
        { email: loginEmail, password: loginPassword },
        config
      );

      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password, profession }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        "/api/v1/register",
        { email, password, name, profession },
        config
      );

      return response.data;
    } catch (error) {
      const customError = new Error(error.response.data.error);
      throw customError;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get("/api/v1/logout");

    return response.data;
  } catch (error) {
    const customError = new Error(error.response.data.error);
    throw customError;
  }
});
// *****************************************************************

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
    loading:false,
    logoutSuccess:false
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;

      state.error = null;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;

        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;

        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.logoutSuccess = action.payload.success;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading =false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
